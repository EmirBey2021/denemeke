const Discord = require('discord.js');

module.exports = {
    kod: "altın",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Yapacağım logonun ismini yazınız...**  <a:maple_leaf:742698148329291826>`)
  const linqo = `https://habbofont.net/font/steampunk/${yazi}.gif`
  .replace(' ', '+')

  
  const narcosembed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RED")
  .setImage(linqo)
  .setFooter('Altın Logo Oluşturuldu')
  message.channel.send(narcosembed)
}
    }

  