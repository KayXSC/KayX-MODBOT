const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Desmutea a un usuario',
    execute(message, args) {
        const userToUnmute = message.mentions.users.first();
        if (userToUnmute) {
            message.guild.members.fetch(userToUnmute)
                .then(async member => {
                    let role = message.guild.roles.cache.find(role => role.name === "Muted");
                    if (!role) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Error')
                            .setDescription("No se encontró el rol 'Muted'");
                        return message.reply({ embeds: [embed] });
                    }

                    if (!member.roles.cache.has(role.id)) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Error')
                            .setDescription("Este usuario no está silenciado");
                        return message.reply({ embeds: [embed] });
                    }

                    await member.roles.remove(role)
                        .then(() => {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#00FF00')
                                .setTitle('Unmute')
                                .setDescription(`Se ha desmuteado a ${userToUnmute.tag} con éxito`);
                            message.reply({ embeds: [embed] });
                        })
                        .catch(err => {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#FF0000')
                                .setTitle('Error')
                                .setDescription('No pude desmutear al miembro');
                            message.reply({ embeds: [embed] });
                            console.error(err);
                        });
                })
                .catch(err => {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Error')
                        .setDescription('¡Ese usuario no está en este servidor!');
                    message.reply({ embeds: [embed] });
                    console.error(err);
                });
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('¡No mencionaste al usuario para desmutear!');
            message.reply({ embeds: [embed] });
        }
    },
};