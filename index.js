const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

// Set up client intents
const myIntents = new Intents();
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
);

// Create the bot client instance
const client = new Client({ intents: myIntents });

// Once the bot client is ready, log a message
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Whenever a member joins the server, kick them
client.on("guildMemberAdd", (member) => {
    member.kick(`Automatic kick of ${member.user.tag}`);
});

// Login to Discord with the bot's token
client.login(token);
