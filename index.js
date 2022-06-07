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
    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});

// Ping command
client.on("messageCreate", (message) => {
    if (message.content === config.prefix + "ping") {
        message.channel.send(
            `Ping: latency is ${
                Date.now() - message.createdTimestamp
            }ms. API Latency is ${client.ws.ping}ms.`
        );
    }
});

// Whenever a member joins the server, kick or ban them
client.on("guildMemberAdd", (member) => {
    if (config.ban) {
        if (member.bannable) {
            member.ban({
                reason: `Automatic ban of ${member.user.tag} (${member.user.id})`,
            });
        } else {
            console.log(
                `Failed to ban member: ${member.user.tag} (${member.user.id})`
            );
        }
    } else {
        if (member.kickable) {
            member.kick(
                `Automatic kick of ${member.user.tag} (${member.user.id})`
            );
        } else {
            console.log(
                `Failed to kick member: ${member.user.tag} (${member.user.id})`
            );
        }
    }
});

// Login to Discord with the bot's token
client.login(config.token);
