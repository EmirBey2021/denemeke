const discord = require('discord.js')

module.exports = {
    kod: ["boks", "boks-makinesi"],
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        var boksmakinesi = ['Boks Makinesi Sonucu ・ **3000 Boks Makinesi Kırıldı.** !', 
                 'Boks Makinesi Sonucu ・ **100 Çook Yavaş Vurdun.**', 
                 'Boks Makinesi Sonucu ・ **900 Eh İşte **', 
                 'Boks Makinesi Sonucu ・ **1000 İyi**',
                 'Boks Makinesi Sonucu ・ **50 Kaplumbağamısın Bune Çooook Yavaş**', 
                 'Boks Makinesi Sonucu ・ **2000 Çok İyi**', 
                 'Boks Makinesi Sonucu ・ **700 Daha İyisini Yapabilirsin.**',
                 'Boks Makinesi Sonucu ・ **500 Yanii Daha İyisini Yapabilirsin**', 
                 'Boks Makinesi Sonucu ・ **999 | 1 Puanla Kaçırdın Be.**', 
                 'Boks Makinesi Sonucu ・ **1100 Fena Değil**', 
                 'Boks Makinesi Sonucu ・ **1200 Güzel Güzel** '
                ];
 var cevap = boksmakinesi[Math.floor(Math.random() * boksmakinesi.length)];

 const embed = new discord.MessageEmbed()
 .setColor(`BLUE`)
 .setDescription(":boxing_glove: " + cevap)
 .setImage('https://media.giphy.com/media/Rl4yxxVEvUge8b5mkW/giphy.gif')
 message.channel.send(embed)
    }
}
