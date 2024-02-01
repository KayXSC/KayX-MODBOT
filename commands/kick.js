const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Expulsa a un usuario',
    execute(message, args) {
        const userToKick = message.mentions.users.first();
        if (userToKick) {
            const member = message.guild.members.resolve(userToKick);
            if (member) {
                member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#00FF00')
                            .setTitle('Kick')
                            .setDescription(`Se ha expulsado a ${userToKick.tag} con éxito`);
                        message.reply({ embeds: [embed] });
                    })
                    .catch(err => {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Error')
                            .setDescription('No pude expulsar al miembro');
                        message.reply({ embeds: [embed] });
                        console.error(err);
                    });
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error')
                    .setDescription('¡Ese usuario no está en este servidor!');
                message.reply({ embeds: [embed] });
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('¡No mencionaste al usuario para expulsar!');
            message.reply({ embeds: [embed] });
        }
    },
};