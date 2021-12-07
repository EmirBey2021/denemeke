module.exports = {
    kod: "ayrıl",
    async run (client, message, args) {
        if (!message.member.voice.channel) return message.channel.send("Sesli Kanalda Değilsiniz.")
        if (!message.guild.me.voice.channel) return message.channel.send("Bot Bir Sesli Kanalda Değil.")
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.chnanel.send("Botu Kanaldan Ayırmak İçin Sesli Kanalda Olmalısınız.")
        message.member.voice.channel.leave()
        message.channel.send("Başarı İle Ayrıldım.")
    } 
}