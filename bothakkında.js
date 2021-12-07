const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    kod: "botgeçmişi",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        const Mesaj = new MessageEmbed()
        .setTitle('**TurgayBOT Geçmişi/Hikayesi**')
    	.setColor('RANDOM')
    	.addField('TurgayBOT Ne Zaman Kuruldu ?', [
            "TurgayBOT 23 Ocak 2021 Tarihinde Kuruldu"
        ])
        .addField('TurgayBOT Ne İçin, Amaçla Kuruldu', [
            "TurgayBOT Eğlence, Moderasyon ve <@768512462759657474>'ın İsteği İle Kuruldu"
        ])
        .addField('Ve Şimdi Son Yazılarımda..', [
        	"TurgayBOT Benim Yazılım Öğrenmeme Çok Fazla Yardımcı Olan Bir Bottu Nedenmi ?",
        	"Çünkü TurgayBOT Sayesinde JavaScript(JS), Python(PY) C# (C Sharp), HTML Öğrendim, Öğrenmeye Çalıştım",
        	"Yakında Daha Fazla Yazılım Dili Öğrenmeye Çalışacağım Çalıştığım Diller (PHP vs.)",
        	"Bu Kadardı Botun Hikayesini Anlattım Ve Birazda Kendimden Bahsettim Okuyanlara Çok Teşekkürler :heart:"
        	])
        message.channel.send(Mesaj)
    }
}