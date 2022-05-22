const { Client, Intents } = require("discord.js");
const config = require("./config.json");

// Create the bot client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

// Once the bot client is ready, log a message
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Whenever a member joins the server, kick them
client.on("guildMemberAdd", (member) => {
    member.kick(`Automatic kick of ${member.user.tag}`);
});

// Login to Discord with the bot's token
client.login(config.token);
