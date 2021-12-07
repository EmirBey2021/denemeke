const Discord = require('discord.js')
module.exports = {
    kod: "komutlar",
    async run (client, message, args) {
        if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  
const embed = new Discord.MessageEmbed()
.setTimestamp()
.setFooter(`${message.author.tag} Tarafından İstendi.`)
.setImage(`https://dummyimage.com/2000x500/47d3a0/007f7f&text=Komutlarım:${client.commands.size}Komut`)
  message.channel.send(embed)
  
  
}
    }