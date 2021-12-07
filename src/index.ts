import { Client, Intents } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.on("messageCreate", (msg) => {
    msg.reply("Hi!")
})

setInterval(function(){ 
    console.log("Hi")
}, 1000);

client.login(process.env.TOKEN)
    .then(() => console.log("Successfully logged into the bot"))