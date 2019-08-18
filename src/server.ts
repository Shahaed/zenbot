import { Client } from "discord.js";
import * as dotenv from "dotenv";
import { FirestoreDB } from "./database/firestore";
import { PlayerServices } from "./services/player_services";
import { PresenceListener } from "./services/presence_update";

/**
 * Entry point that spawns the Discord client
 */
dotenv.config({ path: "./secrets/.env" });
const client: Client = new Client();
client.login(process.env.BOT_TOKEN);

const db = new FirestoreDB(process.env.FIRESTORE_projectId, process.env.GOOGLE_APPLICATION_CREDENTIALS);
const player_service = new PlayerServices(db);
const presence_update = new PresenceListener(player_service);

client.on("ready", () => {
    console.info("Client Connected!");
    presence_update.zen_player_presence_change(client);
});
