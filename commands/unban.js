module.exports = {
    name: 'unban',
    description: 'Desbanea a un usuario',
    async execute(message, args) {
        const userId = args[0];
        if (!userId) {
            return message.reply("¡No proporcionaste el ID del usuario para desbanear!");
        }

        message.guild.members.unban(userId)
            .then(user => {
                message.reply(`Se ha desbaneado a ${user.tag} con éxito`);
            })
            .catch(err => {
                message.reply('No pude desbanear al usuario');
                console.error(err);
            });
    },
};
