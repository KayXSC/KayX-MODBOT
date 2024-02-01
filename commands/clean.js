const Discord = require('discord.js');

module.exports = {
    name: 'clean',
    description: 'Elimina una cantidad de mensajes',
    async execute(message, args) {
        let deleteCount = 0;
        try {
            deleteCount = parseInt(args[0], 10);
        } catch(err) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('Proporcione la cantidad de mensajes que desea eliminar. (máximo 100)');
            return message.reply({ embeds: [embed] });
        }

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('Proporcione un número entre 2 y 100 para la cantidad de mensajes que desea eliminar');
            return message.reply({ embeds: [embed] });
        }

        const fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error')
                    .setDescription(`No se pudieron eliminar mensajes debido a: ${error}`);
                message.reply({ embeds: [embed] });
            });
    },
};