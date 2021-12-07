const Discord = require('discord.js')
module.exports = {
    kod: "botlist-yardım",
    async run (client, message, args) {
        const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('Botlist Yardım Komutları')
.setTimestamp()
.addField('t!bot-onayla botid sahipid ', 'Botu Onaylarsınız')
.addField('t!bot-reddet botid sahipid sebep', 'Botu Reddedersiniz')
.addField('t!bot-ekle', 'Bot eklersiniz')
.addField('t!botlist-ayar', 'Ayarlama Komutlarını Gösterir')
.setImage('https://cdn.discordapp.com/attachments/816786713677529158/818288241185652787/standard.gif')
.setFooter('TurgayBOT', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
    }
}