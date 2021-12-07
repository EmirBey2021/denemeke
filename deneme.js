const Discord = require('discord.js')
const db = require('wio.db')

module.exports = {
    kod: "gold-üye",
    async run (client, message, args) {
        let user = message.mentions.users.first()

        if (!args[0]) {
            const hataembed = new Discord.MessageEmbed()
            .setTitle('**Başarısız !**')
            .setDescription(`Bir Seçenek Belirt, Örnek: t!gold-üye ekle @etiket yada id`)
            return message.channel.send(hataembed)
        
        }
        
        if (args[0] == "ekle") {
            db.fetch(`preüye_${message.guild.id}`, user.id)
            const hataembed4 = new Discord.MessageEmbed()
            .setTitle('**Başarısız !**')
            .setDescription(`Bu Kişinin Zaten Bir Gold Üyeliği Bulunmakta!`)

            return message.channel.send(hataembed4)

           await db.set(`preüye_${message.guild.id}`, user.id)

            const basariembed = new Discord.MessageEmbed()
            .setTitle('**Başarılı !**')
            .setDescription(`Premium Üyeliğiniz <@${message.author.id}> Tarafından Aktif Edildi.`)
            return message.channel.send(basariembed)
        }

        if (args[0] == "sil") {
        db.fetch(`preüye_${message.guild.id}`, user.id)
        const hataembed3 = new Discord.MessageEmbed()
        .setTitle('**Başarısız !**')
        .setDescription(`Bu Kişinin Gold Üyeliği Bulunmuyor.`)
        return message.channel.send(hataembed3)

        await db.delete(`preüye_${message.guild.id}`, user.id)
        const basariembed2 = new Discord.MessageEmbed()
        .setTitle('**Başarılı !**')
        .setDescription(`Kişinin Gold Üyeliği <@${message.author.id}> Tarafından Sonlandırıldı.`)
        return message.channel.send(hataembed3)
        }

    }
}