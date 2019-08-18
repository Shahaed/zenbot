import { CollectionReference, DocumentData } from "@google-cloud/firestore";
import { User } from "discord.js";
import { FirestoreDB } from "../database/firestore";

export class PlayerInfo {
    avatar: string;
    avatarURL?: string | null;
    id: string;
    username: string;

    constructor(id: string, data: DocumentData) {
        this.avatar = data.avatar;
        this.avatarURL = data.avatarURL ? data.avatarURL : undefined;
        this.id = id;
        this.username = data.username;
    }
}


export class PlayerServices {
    player_collection: CollectionReference;

    constructor(firestore_db: FirestoreDB) {
        this.player_collection = firestore_db.firestore.collection("players");
    }

    add_player(user: User) {
        try {
            this.player_collection.doc(user.id).set({
                avatar: user.avatar,
                avatarURL: user.avatarURL,
                username: user.username
            });
        }
        catch (err) {
            console.error("Error adding player to Firestore", err);
        }
    }

    async get_player_by_id(player_id: string): Promise<PlayerInfo> {
        try {
            const player = await this.player_collection.doc(player_id).get();
            if (player.exists) {
                return new PlayerInfo(player.id, player.data());
            }
            else {
                console.warn("player_id '" + player_id + "' does not exist");
                return undefined;
            }
        }
        catch (err) {
            console.error("Error retrieving player_info doc");
        }
    }

    async get_all_players(): Promise<PlayerInfo[]> {
        const players: PlayerInfo[] = [];
        const players_snapshot = await this.player_collection.get();
        players_snapshot.forEach(player => {
            players.push(new PlayerInfo(player.id, player.data()));
        });
        return players;
    }

}
