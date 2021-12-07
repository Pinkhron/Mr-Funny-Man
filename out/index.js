"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const config_json_1 = __importDefault(require("./config.json"));
const dad_jokes_json_1 = __importDefault(require("./assets/dad-jokes.json"));
const reply_messages_json_1 = __importDefault(require("./assets/reply-messages.json"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
const dadJokesWebhook = new discord_js_1.WebhookClient({ url: config_json_1.default.server.hangout.hangout.webhook });
client.on("messageCreate", (msg) => {
    if (msg.content.startsWith("..say")) {
        let msgSay = msg.content.slice(5);
        client.channels.cache.get(msg.channelId).send(msgSay);
    }
    else {
        msg.reply("Hi");
    }
    const randomMsg = reply_messages_json_1.default[Math.floor(Math.random() * reply_messages_json_1.default.length)];
    msg.reply(randomMsg);
});
// Dad Joke Sender
setInterval(function () {
    const randomDadJoke = dad_jokes_json_1.default[Math.floor(Math.random() * dad_jokes_json_1.default.length)];
    dadJokesWebhook.send({
        content: randomDadJoke,
        username: "Very Funny Dad",
        avatarURL: "https://static.wikia.nocookie.net/youtube/images/c/ca/Dad.jpg/revision/latest?cb=20201026072758"
    });
}, 5000);
// Login to the bot
client.login(process.env.TOKEN)
    .then(() => console.log("Successfully logged into the bot"));
let a = "";
