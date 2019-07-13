const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

let rocketLeaugePlayers = ["344614286368440330", "330771775329665038", "289960829112287233"];

client.on("presenceUpdate", (oldMember: any, newMember: any) => {
    const channel = client.channels.get("599042356670365726");
    const new_game = newMember.presence.game ? newMember.presence.game.name : "";
    if (rocketLeaugePlayers.includes(oldMember.id) && newMember.presence.game.name == "Rocket League") {
        channel.send(oldMember.user.username + " started playing Rocket Leauge");
        setTimeout(() => {
            channel.send(oldMember.user.username + " stop playing Rocket Leauge bitch");
        }, 45 * 60 * 1000);

    }
});

// client.on('message', message => {

//     if (message.content === "Start my game timer") {
//         message.reply("Starting timer");
//         setTimeout( () => {
//             message.reply("Stop Playing");
//         }, 10000)

//     }

//     if (message.content === "What game am I playing?") {
//         game = message.author.presence.game
//         if (game) {
//             message.reply(message.author.presence.game.name);
//         }
//         else {
//             message.reply("You're not playing one pussy");
//         }

//     }
// })


