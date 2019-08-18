import { Client, GuildMember } from "discord.js";
import { PlayerServices, PlayerInfo } from "./player_services";


export class PresenceListener {
    player_services: PlayerServices;

    constructor(player_services: PlayerServices) {
        this.player_services = player_services;
    }

    async zen_player_presence_change(client: Client) {
        const all_players_map: Map<string, PlayerInfo> = new Map();
        // We're tracking presence changes of all players in our db. Will probably change this soon
        (await this.player_services.get_all_players()).forEach(player => {
            all_players_map.set(player.id, player);
        });
        client.on("presenceUpdate", (oldMember: GuildMember, newMember: GuildMember) => {
            const player_id = oldMember.user.id;
            if (all_players_map.has(player_id)) {
                console.log(all_players_map.get(player_id).username + "'s presence has changed");
            }
        });
    }

}
