const { MessageEmbed } = require('discord.js');
module.exports = {
    kod: "ağla",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        const embed = new MessageEmbed()
        .setTitle('**Botu Ağlattın İyimi**')
        .setImage('https://media3.giphy.com/media/2rtQMJvhzOnRe/giphy.gif?cid=790b76115d398a482f6177556b32d70a&rid=giphy.gif')
        message.channel.send(embed)
    }
}