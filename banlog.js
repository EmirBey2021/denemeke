const Discord = require('discord.js');
const db = require('wio.db');
module.exports = {

    kod: "ban-log-ayarla",
    async run (client, message, args){
        if (message.channel.type === 'dm') return

   if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın')

   	let kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send('```Ban log kanalını belirtmelisin```')

    db.set(`banlog_${message.guild.id}`, kanal.id)
   
    return message.channel.send(`Ban log kanalı <#${kanal.id}> Olarak ayarlandı!`)
  
 }
}