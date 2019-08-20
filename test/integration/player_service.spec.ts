import { PlayerService } from "../../src/services/player_service";
import { PlayerInfo } from "../../src/models/player_info";
import { expect } from "chai";
import * as dotenv from "dotenv";
import { PresenceManagement } from "../../src/services/presence_management";


describe("Player Services", function () {
  this.timeout(5000);

  before(done => {
    dotenv.config({ path: "./secrets/.env" });

    PresenceManagement.addRocketLeagueStatusChangeHandler();
    PresenceManagement.readCacheForViolation();

    setTimeout(() => done(), 2000);
  });

  it("should push a player and get the same user by id from firestore", async function () {
    const expected_info = new PlayerInfo({
      avatar: "eb0ec312a72ca773993fe9130dc6873a",
      avatarURL: "https://cdn.discordapp.com/avatars/344614286368440330/eb0ec312a72ca773993fe9130dc6873a.png?size=2048",
      username: "Shahaed",
      id: "344614286368440330",
      start_time: Date.now()
    });
    await PlayerService.getInstance.addPlayer(expected_info);
    const data = await PlayerService.getInstance.getPlayerById(expected_info.id);
    expect(data).to.eql(expected_info);
    await PlayerService.getInstance.removePlayer(expected_info.id);
  });
});
