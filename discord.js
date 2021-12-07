const Discord = require('discord.js');

module.exports = {
    kod: "discord",
    async run (client, message, args) {
      if (message.channel.type === 'dm') return
        const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Yapacağım logonun ismini yazınız...**  <a:maple_leaf:742698148329291826>`)
  const linqo = `https://flamingtext.com/net-fu/proxy_form.cgi?script=adidas-logo&fontname=ethnocentric&text=${yazi}&script=adidas-logo&text=Discord&fontname=ethnocentric&fillTextColor=%236d81e7&fillOutlineColor=%23fbfaf9&shadowType=0&backgroundRadio=0&imageoutput=true`
  .replace(' ', '+')

  
  const narcosembed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RED")
  .setImage(linqo)
  .setFooter('Discord Logo Oluşturuldu')
  message.channel.send(narcosembed)
}
} 
  