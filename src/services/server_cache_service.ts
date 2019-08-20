import { PlayerService } from "../services/player_service";
import { CACHE_REFRESH_RATE_MS } from "../utils/constants";
import { PlayerInfo } from "../models/player_info";


export class ServerCacheService {
    private static instance: ServerCacheService;

    private cacheMap: Map<string, PlayerInfo>;

    private constructor() {
        this.cacheMap;
    }

    static get getInstance() {
        if (!ServerCacheService.instance) {
            ServerCacheService.instance = new ServerCacheService();
            ServerCacheService.backgroundCacheRefreshJob();
        }

        return ServerCacheService.instance;
    }

    static async backgroundCacheRefreshJob() {
        await ServerCacheService.getInstance.refreshCache();
        return setTimeout(
            ServerCacheService.backgroundCacheRefreshJob,
            CACHE_REFRESH_RATE_MS
        );
    }

    async refreshCache() {
        console.info("Cache refresh");
        this.cacheMap = await PlayerService.getInstance.getAllPlayers();
    }

    insertNewPlayer(player_id: string, player_info: PlayerInfo) {
        this.cacheMap.set(player_id, player_info);
    }

    getPlayer(player_id: string): PlayerInfo {
        return this.cacheMap.get(player_id);
    }

    getPlayerStartTime(player_id: string): number {
        return this.cacheMap.get(player_id).start_time;
    }

    getAllPlayers(): Map<string, PlayerInfo> {
        return this.cacheMap;
    }

    hasPlayer(player_id: string): boolean {
        return this.cacheMap.has(player_id);
    }

    removePlayer(player_id: string) {
        this.cacheMap.delete(player_id);
    }
}
