const Discord = require('discord.js');

module.exports = {
    kod: "trump",
    async run (client, message, args) {
      if (message.channel.type === 'dm') return
         const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Trump'un Ne Diyeceğini Yazmalısın.**`)
  const linqo = `https://api.no-api-key.com/api/v2/trump?message=${yazi}`
  .replace(' ', '+')

  
  const narcosembed = new Discord.MessageEmbed()
  .setTitle("**Trump Diyorki..**")
  .setImage(linqo)
  message.channel.send(narcosembed)
}
    }
 