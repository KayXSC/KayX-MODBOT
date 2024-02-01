const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Banea a un usuario',
    execute(message, args) {
        const userToBan = message.mentions.users.first();
        if (userToBan) {
            const member = message.guild.members.resolve(userToBan);
            if (member) {
                member
                    .ban('Optional reason that will display in the audit logs')
                    .then(() => {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#00FF00')
                            .setTitle('Ban')
                            .setDescription(`Se ha baneado a ${userToBan.tag} con éxito`);
                        message.reply({ embeds: [embed] });
                    })
                    .catch(err => {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Error')
                            .setDescription('No pude banear al miembro');
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
                .setDescription('¡No mencionaste al usuario para banear!');
            message.reply({ embeds: [embed] });
        }
    },
};