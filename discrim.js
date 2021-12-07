const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    kod: "discrim",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
  if(args.length > 4) return message.channel.send(new Discord.MessageEmbed().setTitle('Discrimler 4 Basamaklı Olur'))
      const discrim = args[0] || message.author.discriminator;
        const users = client.users.cache.filter(user => user.discriminator === discrim).map(user => user.tag);
        if (users < 1) {
            if(isNaN(args[0])) return  message.channel.send(new Discord.MessageEmbed().setDescription(`Yazı Yazamazsın!`).setColor("RANDOM"));
            return message.channel.send(new Discord.MessageEmbed().setDescription(`${discrim} Bulunamadı!`).setColor("RANDOM"));
          
        } else {
           message.channel.send(`KULLANICI: ${users.join('\nKULLANICI: ')}`, {split: true, code: ""})       
}
}
}