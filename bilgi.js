module.exports = {
    kod: "bilgi",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        const { MessageEmbed } = require('discord.js')
        const embed = new MessageEmbed()
        .setTitle('Bilgi Menüsü')
        .setColor('RANDOM')
        .addField('t!sunucubilgi', 'Bulunduğunuz Sunucun Bilgilerini Gösterir')
        .addField('t!kullanıcıbilgi', 'Sizin ve Etiketlediğiniz Kişinin Bilgilerini Gösterir')
        .addField('t!emojibilgi', 'Emojinin İsmini Aratıp Bilgilerini Bulabilirsiniz')
        message.channel.send(embed)
    }
}