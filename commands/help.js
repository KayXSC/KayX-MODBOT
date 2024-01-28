const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Muestra la ayuda del bot',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff') // Puedes cambiar el color del embed
            .setTitle('Ayuda del Bot') // El título del embed
            .setURL('https://discord.js.org/') // Puedes agregar un URL al título
            .setAuthor('Nombre del Autor', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org') // Puedes agregar un autor con su imagen y URL
            .setDescription('Estos son los comandos que puedes usar:') // Descripción del embed
            .setThumbnail('https://i.imgur.com/wSTFkRM.png') // Puedes agregar una imagen en miniatura
            .addFields(
                { name: '!ban @usuario', value: 'Banea al usuario mencionado.' },
                { name: '!unban ID', value: 'Desbanea al usuario con el ID proporcionado.' },
                { name: '!mute @usuario', value: 'Silencia al usuario mencionado.' },
                { name: '!unmute @usuario', value: 'Quita el silencio al usuario mencionado.' },
                { name: '!kick @usuario', value: 'Expulsa al usuario mencionado.' },
                { name: '!help', value: 'Muestra este mensaje de ayuda.' },
            ) // Puedes agregar campos al embed
            .setImage('https://i.imgur.com/wSTFkRM.png') // Puedes agregar una imagen principal
            .setTimestamp() // Puedes agregar una marca de tiempo
            .setFooter('Pie de página del embed', 'https://i.imgur.com/wSTFkRM.png'); // Puedes agregar un pie de página con su imagen

        message.channel.send({ embeds: [embed] });
    },
};