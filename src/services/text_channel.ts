import { Client } from "discord.js";

export class TextChannel {
    client: Client;

    constructor(client: Client) {
        this.client = new Client;
    }

    send_to_channel(channel: string, message: string) {
        return;
    }
}
