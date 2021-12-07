var Discord = require('discord.js')

module.exports = {
    kod: "ayarlamalı",
    async run (client, message, args) {
        var turgay = new Discord.MessageEmbed()
        .setTitle('**Ayarlamalı**')
        .setColor('RANDOM')
        .addField('**t!link-engel aç/kapat**', '**Link Engel Açıp/Kapatırsınız**')
        .addField('**t!everhere-engel aç/kapat**', '**Ever-Here Engel Açıp/Kapatırsınız**')
        .addField('**t!küfürengel aç/kapat**', '**Küfür Engel Açıp Kapatırsınız**')
        .addField('**t!sa-as aç/kapat**', '**Sa-As Sistemini Açıp Kapatırsınız**')
        .addField('**t!modlog aç/kapat**', '**ModLog Sistemini Açıp Kapatırsınız**')
        .addField('**t!prefix-ayarla (prefix) | t!prefix-sıfırla**', '**Prefixi Ayarlarsınız/Sıfırlarsınız**')
        .addField('**t!reklam-engel aç/kapat**', '**Reklam Engel Sistemini Açıp Kapatırsınız**')
        .addField('**t!capsengel aç/kapat**', '**Capsengel Açıp/Kapatırsınız**')
        .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
        message.channel.send(turgay)
    }
}