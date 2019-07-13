import { Client, GuildMember, TextChannel } from "discord.js";

const rocketLeaugePlayers = ["344614286368440330", "330771775329665038", "289960829112287233"];

export function presence_update(client: Client) {
    client.on("presenceUpdate", (oldMember: GuildMember, newMember: GuildMember) => {
        const channel: TextChannel = client.channels.get("599042356670365726");
        const new_game = newMember.presence.game ? newMember.presence.game.name : "";
        if (rocketLeaugePlayers.includes(oldMember.id) && newMember.presence.game.name == "Rocket League") {
            channel.send(oldMember.user.username + " started playing Rocket Leauge");
            setTimeout(() => {
                channel.send(oldMember.user.username + " stop playing Rocket Leauge bitch");
            }, 45 * 60 * 1000);
        }
    });
}