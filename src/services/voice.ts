import { GuildMember } from "discord.js";
import ytdl from "ytdl-core";

const audioStream: string = "https://youtu.be/EHmC2D0_Hdg";

export class Voice {

    static async endTimerInVoiceChannel(member: GuildMember) {
        if (!this.voiceChannelAvailable(member)) {
            return "false";
        }
        const connection = await member.voiceChannel.join();
        const stream = ytdl(audioStream, { filter: "audioonly" });

        console.log(stream);
        const dispatcher = connection.playStream(stream);

        return dispatcher;
    }

    static voiceChannelAvailable(member: GuildMember) {
        return member.voiceChannel != undefined;
    }
}
