const Discord = require("discord.js")
module.exports = {
    kod: "wasted",
    async run (client, message, args){
      if (message.channel.type === 'dm') return
      let user = message.mentions.users.first(); 
      if (message.mentions.users.size < 1) return message.reply('**Kime Wasted Efekti Verim**').catch(console.error); 
      const DarkCode = new Discord.MessageEmbed()
      .setColor("0x808080") 
      .setDescription(message.author.username + ` ${user}` + ' Adlı Kişiye **WASTED** Efekti Verdi')
      .setImage('https://media.giphy.com/media/qgbWNOvZOtwWs/giphy.gif') 
      return message.channel.send(DarkCode); 
    }

      
    
}