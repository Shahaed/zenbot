import { GuildMember } from "discord.js";
import { PlayerInfo } from "./player_services";

export async function time_rl(guild_player: GuildMember, player: PlayerInfo, time: number) {
  if (guild_player.presence.game != undefined && guild_player.presence.game.toString() == "Rocket League") {
    console.log("player_is_playingRL");
    if (!player.playing) {
      console.log("timer started");

      player.playing == true;
      await wait(time);
      player.playing == false;
      console.log("timer ended");
      return [player, "played once"];
    }
  }
  return [player, undefined];
}

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
