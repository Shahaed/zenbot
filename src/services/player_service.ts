import { CollectionReference } from "@google-cloud/firestore";
import { DatabaseGateway } from "../gateways/database_gateway";
import { PlayerInfo } from "../models/player_info";
import { ServerCacheService } from "./server_cache_service";
import { PresenceManagement } from "./presence_management";
import { PATROL_PLAYER_RATE_MS } from "../utils/constants";


export class PlayerService {
    private static instance: PlayerService;
    player_collection: CollectionReference;

    private constructor() {
        this.player_collection = DatabaseGateway.getFirestore.collection("players");
    }

    static get getInstance() {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }

        return PlayerService.instance;
    }

    static patrolPlayers() {
        PlayerService.searchOneRoundOfPlayers();
        setTimeout(PlayerService.patrolPlayers, PATROL_PLAYER_RATE_MS);
    }

    static async searchOneRoundOfPlayers() {
        const players: Map<string, PlayerInfo> = await PlayerService.getInstance.getAllPlayers();
        players.forEach(PresenceManagement.checkPlayerHandler);
    }

    async addPlayer(user: PlayerInfo, start_time?: number) {
        try {
            if (start_time) user.start_time = start_time;
            await this.player_collection.doc(user.id).set({
                ...user
            });

            ServerCacheService.getInstance.insertNewPlayer(user.id, user);
        } catch (error) {
            console.error("Error adding player to Firestore", error);
            throw error;
        }
    }

    async removePlayer(player_id: string) {
        try {
            await this.player_collection.doc(player_id).delete();
            ServerCacheService.getInstance.removePlayer(player_id);
        } catch (error) {
            console.error("Error deleting player", player_id, error);
            throw new Error("Error deleting player");
        }
    }

    async updateUserPresenceStartTime(player_id: string, start_time: number) {
        try {
            await this.player_collection.doc(player_id).update({ start_time });
            const player: PlayerInfo = await this.getPlayerById(player_id);
            ServerCacheService.getInstance.insertNewPlayer(player_id, player);
        } catch (error) {
            console.error("Error updating start_time", error);
            throw new Error("Error updating start_time");
        }
    }

    async getPlayerById(player_id: string): Promise<PlayerInfo> {
        try {
            const player_from_cache = ServerCacheService.getInstance.getPlayer(player_id);
            if (player_from_cache) return player_from_cache;
            const player = await this.player_collection.doc(player_id).get();
            if (player.exists) {
                return new PlayerInfo(player.data());
            } else {
                console.warn("player_id '" + player_id + "' does not exist");
                throw new Error("Player doesn't exist");
            }
        } catch (err) {
            console.error("Error retrieving player_info doc:", err);
            throw err;
        }
    }

    async getAllPlayers(): Promise<Map<string, PlayerInfo>> {
        const players_from_cache = await ServerCacheService.getInstance.getAllPlayers();
        if (players_from_cache) return players_from_cache;

        const players_snapshot = await this.player_collection.get();
        const players: Map<string, PlayerInfo> = new Map();
        players_snapshot.forEach(player => {
            players.set(player.id, new PlayerInfo(player.data()));
        });
        return players;
    }
}
