import { Client, Intents, WebhookClient, TextChannel, Message } from "discord.js"
import dotenv from "dotenv"


import config from "./config.json"
import dadJokes from "./assets/dad-jokes.json"
import msgReplies from "./assets/reply-messages.json"


dotenv.config()


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})


const dadJokesWebhook = new WebhookClient({ url: config.server.hangout.hangout.webhook })


client.on("messageCreate", (msg) => {
    if (msg.content.startsWith("..say")) {
        let msgSay = msg.content.slice(5);

        (client.channels.cache.get(msg.channelId) as TextChannel).send(msgSay)
    } else {
        msg.reply("Hi")
        msg.react("🔥")
        msg.react("💯")
        msg.react("😎")
    }

    const randomMsg = msgReplies[Math.floor(Math.random() * msgReplies.length)]

    msg.reply(randomMsg)
})


// Dad Joke Sender
setInterval(function(){

    const randomDadJoke = dadJokes[Math.floor(Math.random() * dadJokes.length)]

    dadJokesWebhook.send({
        content: randomDadJoke,
        username: "Very Funny Dad",
        avatarURL: "https://static.wikia.nocookie.net/youtube/images/c/ca/Dad.jpg/revision/latest?cb=20201026072758"
    })

}, 5000);


// Login to the bot

client.login(process.env.TOKEN)
    .then(() => console.log("Successfully logged into the bot"))

    let a = ""