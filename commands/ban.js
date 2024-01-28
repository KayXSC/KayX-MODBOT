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
                        message.reply(`Se ha baneado a ${userToBan.tag} con éxito`);
                    })
                    .catch(err => {
                        message.reply('No pude banear al miembro');
                        console.error(err);
                    });
            } else {
                message.reply("¡Ese usuario no está en este servidor!");
            }
        } else {
            message.reply("¡No mencionaste al usuario para banear!");
        }
    },
};