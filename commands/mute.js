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
                        return message.reply("Este usuario ya ha sido silenciado");
                    }

                    await member.roles.add(role)
                        .then(() => {
                            message.reply(`Se ha silenciado a ${userToMute.tag} con éxito`);
                        })
                        .catch(err => {
                            message.reply('No pude silenciar al miembro');
                            console.error(err);
                        });
                })
                .catch(err => {
                    message.reply("¡Ese usuario no está en este servidor!");
                    console.error(err);
                });
        } else {
            message.reply("¡No mencionaste al usuario para silenciar!");
        }
    },
};