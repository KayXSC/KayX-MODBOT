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
                        return message.reply("No se encontró el rol 'Muted'");
                    }

                    if (!member.roles.cache.has(role.id)) {
                        return message.reply("Este usuario no está silenciado");
                    }

                    await member.roles.remove(role)
                        .then(() => {
                            message.reply(`Se ha desmuteado a ${userToUnmute.tag} con éxito`);
                        })
                        .catch(err => {
                            message.reply('No pude desmutear al miembro');
                            console.error(err);
                        });
                })
                .catch(err => {
                    message.reply("¡Ese usuario no está en este servidor!");
                    console.error(err);
                });
        } else {
            message.reply("¡No mencionaste al usuario para desmutear!");
        }
    },
};