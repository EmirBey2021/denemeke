const Discord = require('discord.js');

module.exports = {
    kod: ["deprembilgi", "deprem"],
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        var embed = new Discord.MessageEmbed()
        .setTitle('Deprem Bilgi İçin Tıkla')
        .setColor('076ef8')
        .setURL('http://www.koeri.boun.edu.tr/scripts/lst0.asp')
        .setFooter(`Komut ${message.author.username} Tarafından Kullanıldı`, message.author.displayAvatarURL({dynamic:true}))
        message.channel.send(embed)
    }
}