import { Client } from "discord.js";
import * as dotenv from "dotenv";
import { presence_update } from "./presence_update";

/**
 * Entry point that spawns the Discord client
 */
dotenv.config();
const client = new Client();

client.login(process.env.BOT_TOKEN);


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

presence_update(client);
