import { GuildMember } from "discord.js";
import { PlayerService } from "./player_service";
import { DiscordGateway } from "../gateways/discord_gateway";
import { Voice } from "./voice";
import { TIME_ALLOWED_TO_PLAY } from "../utils/constants";
import { PlayerInfo } from "../models/player_info";

export class PresenceManagement {
    static addRocketLeagueStatusChangeHandler() {
        DiscordGateway.getInstance.setPresenceUpdateHandler(async function (oldMember: GuildMember, newMember: GuildMember) {
            if (!oldMember.presence.game && newMember.presence.game && newMember.presence.game.toString() == "Rocket League") {
                // add to cache and db
                console.info("Adding player");
                const now = Date.now();
                await PlayerService.getInstance.addPlayer(new PlayerInfo(newMember.user, now));
            } else if (oldMember.presence.game && !newMember.presence.game && oldMember.presence.game.toString() == "Rocket League") {
                // remove from cache and db
                console.info("Removing player");
                await PlayerService.getInstance.removePlayer(newMember.user.id);
            }
        });
    }

    static readCacheForViolation() {
        PlayerService.patrolPlayers();
    }

    static checkPlayerHandler(player_info: PlayerInfo, player_id: string) {
        if (!player_info.start_time || player_info.start_time === 0) {
            PlayerService.getInstance.removePlayer(player_id);
        }

        if ((player_info.start_time + TIME_ALLOWED_TO_PLAY) < Date.now()) {
            console.warn(`Player ${player_id} has played over ${TIME_ALLOWED_TO_PLAY / (1000 * 60)} minutes of Rocket League`);
            DiscordGateway.getDiscordClient.fetchUser(player_id)
                .then(DiscordGateway.getViableVoiceChannelForUser)
                .then(Voice.endTimerInVoiceChannel);
        }
    }
}
