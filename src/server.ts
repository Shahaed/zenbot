import * as dotenv from "dotenv";
import { PresenceManagement } from "./services/presence_management";


/**
 * Entry point that spawns the Discord client
 */
dotenv.config({ path: "./secrets/.env" });

(function () {
    PresenceManagement.addRocketLeagueStatusChangeHandler();
    PresenceManagement.readCacheForViolation();
})();
