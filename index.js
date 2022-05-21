const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

// Create the bot client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Once the bot client is ready, log a message
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Login to Discord with the bot's token
client.login(token);
