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
                        message.reply(`Se ha expulsado a ${userToKick.tag} con éxito`);
                    })
                    .catch(err => {
                        message.reply('No pude expulsar al miembro');
                        console.error(err);
                    });
            } else {
                message.reply("¡Ese usuario no está en este servidor!");
            }
        } else {
            message.reply("¡No mencionaste al usuario para expulsar!");
        }
    },
};