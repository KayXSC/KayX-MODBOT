const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ 
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES", 
        "GUILD_VOICE_STATES"
    ] 
});

require('dotenv').config();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('KayX esta funcionando correctamente. Todos los derechos reservados a KayX Co!');
    client.user.setActivity('kayx.es | $help', { type: 'WATCHING' });
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('$') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error al ejecutar ese comando!');
    }
});

client.login(process.env.TOKEN);