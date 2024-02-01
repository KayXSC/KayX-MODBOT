const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Desbanea a un usuario',
    async execute(message, args) {
        const userId = args[0];
        if (!userId) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('¡No proporcionaste el ID del usuario para desbanear!');
            return message.reply({ embeds: [embed] });
        }

        message.guild.members.unban(userId)
            .then(user => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Unban')
                    .setDescription(`Se ha desbaneado a ${user.tag} con éxito`);
                message.reply({ embeds: [embed] });
            })
            .catch(err => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error')
                    .setDescription('No pude desbanear al usuario');
                message.reply({ embeds: [embed] });
                console.error(err);
            });
    },
};