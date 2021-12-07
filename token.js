module.exports = {
    kod: "token",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
        .setDescription(`**${message.author.username}** ` + ' **Buyur Tokenim**')
        .setImage('https://cdn.discordapp.com/attachments/811556794793984040/812148896146522143/tumblr_inline_mfnkqu0QUy1r6swbd540.gif')
        message.channel.send(embed)
    }
}