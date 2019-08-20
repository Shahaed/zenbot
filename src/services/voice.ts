import { GuildMember } from "discord.js";
import ytdl from "ytdl-core";
import { PlayerService } from "./player_service";

const youtube_video_url: string = "https://youtu.be/EHmC2D0_Hdg";

export class Voice {
    static async endTimerInVoiceChannel(member: GuildMember) {
        console.info("Ending timer in voice channel");
        if (member.voiceChannel == undefined) {
            return;
        }

        const connection = await member.voiceChannel.join();
        const stream = ytdl(youtube_video_url, { filter: "audioonly" });

        // TODO: this is temporary
        PlayerService.getInstance.removePlayer(member.user.id);
        return connection.playStream(stream);
    }
}
