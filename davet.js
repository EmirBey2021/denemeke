module.exports = {
    kod: "davet",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        const { MessageEmbed } = require('discord.js')
        const embed = new MessageEmbed()
        .setTitle('**Botu Davet Et**')
        .addField('**Davet Etmek İçin Tıkla**', [
            "[Tıkla Ve Davet Et](https://discord.com/oauth2/authorize?client_id=802577199155642418&scope=bot&permissions=805829694)"
        ])
        message.channel.send(embed)
    }
}