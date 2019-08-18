import { FirestoreDB } from "../src/database/firestore";
import { PlayerServices, PlayerInfo } from "../src/services/player_services";
import { expect } from "chai";
import * as dotenv from "dotenv";


describe("Player Services", function () {

    dotenv.config({ path: "./secrets/.env" });
    const db = new FirestoreDB(process.env.FIRESTORE_projectId, process.env.GOOGLE_APPLICATION_CREDENTIALS);
    const player_service = new PlayerServices(db);

    it("should get player by id from firestore", async function () {
        const expected_info = new PlayerInfo("344614286368440330", {
            avatar: "eb0ec312a72ca773993fe9130dc6873a",
            avatarURL: "https://cdn.discordapp.com/avatars/344614286368440330/eb0ec312a72ca773993fe9130dc6873a.png?size=2048",
            username: "Shahaed"
        });
        const data = await player_service.get_player_by_id("344614286368440330");
        expect(data).to.eql(expected_info);
    });
});
