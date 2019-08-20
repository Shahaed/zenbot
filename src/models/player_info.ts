import { DocumentData } from "@google-cloud/firestore";
import { User } from "discord.js";

export class PlayerInfo {
    avatar: string;
    avatarURL?: string | null;
    id: string;
    username: string;
    playing: boolean;
    start_time?: number;

    constructor(data: DocumentData | User, start_time?: number) {
        this.avatar = data.avatar;
        this.avatarURL = data.avatarURL || undefined;
        this.id = data.id;
        this.username = data.username;
        this.start_time = (data as DocumentData).start_time || start_time || 0;
    }
}
