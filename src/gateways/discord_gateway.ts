import { Client, GuildMember, Guild, User } from "discord.js";


export class DiscordGateway {
    private static instance: DiscordGateway;

    private client: Client;

    private constructor() {
        this.client = new Client();
        this.client.login(process.env.BOT_TOKEN);

        this.client.on("error", (error: Error) => {
            console.error("Catastrophic error occurred on Discord.js client", error);
            console.error("Exiting");
            process.exit(1);
        });

        this.client.on("disconnect", () => {
            console.error("server disconnected...");
        });
    }

    static get getDiscordClient() {
        return DiscordGateway.getInstance.client;
    }

    static get getInstance() {
        if (!DiscordGateway.instance) {
            DiscordGateway.instance = new DiscordGateway();
        }

        return DiscordGateway.instance;
    }

    static getAllAvailableGuilds() {
        console.info("Getting all available guilds");
        return DiscordGateway.getInstance.client.guilds.map((value: Guild) => value);
    }

    static getViableVoiceChannelForUser(user: User): GuildMember {
        const [guild] = DiscordGateway.getAllAvailableGuilds().filter(guild => !!guild.member(user).voiceChannel);

        if (!guild) return undefined;
        return guild.member(user);
    }

    setPresenceUpdateHandler(handler: (oldMember: GuildMember, newMember: GuildMember) => Promise<void>) {
        this.client.on("presenceUpdate", handler);
    }
}
