const { Client, Intents } = require("discord.js");
const config = require("./config.json");

// Create the bot client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
    ],
});

// Once the bot client is ready, log a message
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Ping command
client.on("messageCreate", message => {
    if (message.content === "ping") {
        message.channel.send(`Ping: latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${client.ws.ping}ms`);
    }
});

// Whenever a member joins the server, kick or ban them
client.on("guildMemberAdd", member => {
    if (config.ban) {
        member.ban({reason: `Automatic ban of ${member.user.tag}`});
    } else {
        member.kick(`Automatic kick of ${member.user.tag}`);
    }
});

// Login to Discord with the bot's token
client.login(config.token);
