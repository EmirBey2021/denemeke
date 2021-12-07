const Discord = require("discord.js")
module.exports = {
    kod: "yumrukat",
    async run (client, message, args){
      if (message.channel.type === 'dm') return
      let user = message.mentions.users.first(); 
      if (message.mentions.users.size < 1) return message.reply('**Kimi Tokatlayacam Reis Etiketlede Vurayım Ağzının Ortasına **').catch(console.error); 
      const DarkCode = new Discord.MessageEmbed()
      .setColor("0x808080") 
      .setDescription(message.author.username + ` ${user}` + '** Adlı Kişiyi Yumrukladı **' + `${user}` + ' Karşılık Vermelisin') 
      .setImage('https://media.giphy.com/media/l1J3G5lf06vi58EIE/giphy.gif') 
      return message.channel.send(DarkCode); 
    }
   
      
    
}