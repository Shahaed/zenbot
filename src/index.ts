import { Client } from "discord.js";
import * as dotenv from "dotenv";
import { FirestoreDB } from "./database/firestore";
import { PlayerServices } from "./services/player_services";

/**
 * Entry point that spawns the Discord client
 */
dotenv.config({ path: "./secrets/.env" });
const client: Client = new Client();
client.login(process.env.BOT_TOKEN);

const db = new FirestoreDB(process.env.FIRESTORE_projectId, process.env.GOOGLE_APPLICATION_CREDENTIALS);
const player_service = new PlayerServices(db);


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    player_service.get_player_by_id("344614286368440330").then(data => {
        console.log(data);
    });

    client.fetchUser("344614286368440330").then(user => {
        player_service.add_player(user);
    });
});
