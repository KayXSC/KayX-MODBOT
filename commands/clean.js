module.exports = {
    name: 'clean',
    description: 'Elimina una cantidad de mensajes',
    async execute(message, args) {
        let deleteCount = 0;
        try {
            deleteCount = parseInt(args[0], 10);
        } catch(err) {
            return message.reply('Proporcione la cantidad de mensajes que desea eliminar. (máximo 100)');
        }

        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply('Proporcione un número entre 2 y 100 para la cantidad de mensajes que desea eliminar');

        const fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`No se pudieron eliminar mensajes debido a: ${error}`));
    },
};