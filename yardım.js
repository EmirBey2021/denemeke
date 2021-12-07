var Discord = require('discord.js');
var db = require('wio.db')

module.exports = {
    kod: ["yardım", "y", "help"],
    async run (client, message, args) {
        //Bot.js felan onlarda 'Böyle Komut Bulunamadı dan Sonra .catch den önce o aaraya yaz (Komutlarda ise async run daki bi alt satıra yaz
if(!await db.has("prefix" + message.guild.id)) {
       var prefix = "t!"
      } else {
        var prefix = await db.fetch("prefix" + message.guild.id)
      }
        if (message.channel.type === 'dm') return
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("`Yardım Menüsü` | `Mevcut Prefix'im` `t!` Ama Siz t!prefix-ayarla İle Değiştirebilirsiniz.")
        .addField("Komut Sayım:",`${client.commands.size}`)
        .addField('<a:S_Tik:825498710267002900> » **Moderasyon Komutları**', [
            `➼ ${prefix}moderasyon`
        ])
        .addField('<a:S_Tik:825498710267002900> » **Eğlence Komutları**', [
            `➼ ${prefix}eğlence`
        ])
        .addField('<a:S_Tik:825498710267002900> » **Kullanıcı Komutları**', [
            `➼ ${prefix}kullanıcı`
        ])
        .addField('<a:S_Tik:825498710267002900>> » Logo Komutları', [
            `➼ ${prefix}logo`
        ])

        .addField('<a:S_Tik:825498710267002900> » Ayarlamalı Komutlar', [
            `➼ ${prefix}ayarlamalı`
        ])

        .addField('<a:S_Tik:825498710267002900> » Seviye Komutları', [
            `➼ ${prefix}seviye`
        ])

        .addField('<a:S_Tik:825498710267002900> » Botlist Komutları', [
            `➼ ${prefix}botlist-yardım`
        ])

        .addField('<a:S_Tik:825498710267002900> » Mute Komutları', [
            `➼ ${prefix}mute-yardım`
        ])

        .addField('<a:S_Tik:825498710267002900> » Profil Komutları', [
            `➼ ${prefix}p-y`
        ])

        .addField('➥ | Bağlantılar', [
            "➥ <a:S_Tik:825498710267002900> **[Discord](https://discord.gg/Q4gady9Mdc)**",
            "➥ <a:S_Tik:825498710267002900> **[Davet Etmek İçin Tıkla](https://discord.com/oauth2/authorize?client_id=802577199155642418&scope=bot&permissions=805829694)**",
            "➥ <a:S_Tik:825498710267002900> **[İnstagram](https://instagram.com/turgaybot/)**",
        ])
        .addField('➥ Eğer Bot İçin Önerileriniz Var İse', 't!istek (Öneriniz) Yazarak Öneri Gönderebilirsiniz.')
        .setImage('https://cdn.discordapp.com/attachments/816786713677529158/818288241185652787/standard.gif')
        .setFooter(` © ${client.user.username} | Botumuz Sizin İsteklerinizle Güzelleşiyor.`, `${client.user.displayAvatarURL({dynamic: true})}`)
        message.channel.send(embed)
    }
}
