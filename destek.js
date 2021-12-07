module.exports = {
    kod: "destek",
    async run (client, message, args) {
        const { MessageEmbed } = require('discord.js')
        const embed = new MessageEmbed()
        .setTitle('Destek Sunucusu')
        .setColor('RANDOM')
        .setFooter('TurgayBOT')
        .addField('Destek Sunucum', [
            '[Destek Sunucum](https://discord.gg/Q4gady9Mdc)'
        ])
        message.channel.send(embed)
    }
}