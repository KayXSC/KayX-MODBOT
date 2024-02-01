const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Silencia a un usuario',
    execute(message, args) {
        const userToMute = message.mentions.users.first();
        if (userToMute) {
            message.guild.members.fetch(userToMute)
                .then(async member => {
                    let role = message.guild.roles.cache.find(role => role.name === "Muted");
                    if (!role) {
                        role = await message.guild.roles.create({
                            name: "Muted",
                            permissions: []
                        });

                        // Mover el rol "Muted" al tope de la lista de roles
                        try {
                            await role.setPosition(0);
                        } catch (err) {
                            console.error('No se pudo mover el rol "Muted" al tope de la lista de roles');
                        }

                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.permissionOverwrites.create(role, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false
                            });
                        });
                    }

                    if (member.roles.cache.has(role.id)) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Error')
                            .setDescription("Este usuario ya ha sido silenciado");
                        return message.reply({ embeds: [embed] });
                    }

                    await member.roles.add(role)
                        .then(() => {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#00FF00')
                                .setTitle('Mute')
                                .setDescription(`Se ha silenciado a ${userToMute.tag} con éxito`);
                            message.reply({ embeds: [embed] });
                        })
                        .catch(err => {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#FF0000')
                                .setTitle('Error')
                                .setDescription('No pude silenciar al miembro');
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
                .setDescription('¡No mencionaste al usuario para silenciar!');
            message.reply({ embeds: [embed] });
        }
    },
};