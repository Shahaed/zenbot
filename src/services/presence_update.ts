import { Client, GuildMember } from "discord.js";
import { PlayerServices, PlayerInfo } from "./player_services";
import { time_rl } from "./rocket_leauge_timer";
import { Voice } from "./voice";

export class PresenceListener {
    player_services: PlayerServices;

    constructor(player_services: PlayerServices) {
        this.player_services = player_services;
    }

    async zen_player_presence_change(client: Client) {
        const all_players_map: Map<string, PlayerInfo> = new Map();
        // We're tracking presence changes of all players in our db. Will probably change this soon
        (await this.player_services.get_all_players()).forEach(player => {
            player.playing = false;
            all_players_map.set(player.id, player);
        });
        client.on("presenceUpdate", async function (oldMember: GuildMember, newMember: GuildMember) {
            const player_id = oldMember.user.id;
            if (all_players_map.has(player_id)) {
                // Should be abstracted. A lot of hardcoding rn
                // 2.7e6 is 45mins in milliseconds
                const rl_timed = await time_rl(newMember, all_players_map.get(player_id), 2.7e6);
                console.log(rl_timed);
                if (rl_timed[1] != undefined) {
                    Voice.endTimerInVoiceChannel(newMember);
                }
            }
        });
    }
}
