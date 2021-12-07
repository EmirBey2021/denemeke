const Discord = require('discord.js');
const db = require('quick.db');
///fiber botlist & code
module.exports = {
    kod: ["botekle", "addbot", "bot-ekle", "add-bot"],
    async run (client, message, args) {
        
	let botid = args[0]
	let prefix = args[1]
  let onaylımı = args[2]
  let basvuru = db.fetch(`basvuruk_${message.guild.id}`)
	let kanal = db.fetch(`bot-ekle_${message.guild.id}`)
  let log =   db.fetch(`bot-log_${message.guild.id}`)
	if(!log) return message.channel.send("Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor. Ayarlamak içn t!botlist-ayar")
  if(!basvuru) return message.channel.send("Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor. Ayarlamak içn t!botlist-ayar")
  if(!kanal) return message.channel.send("Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor. Ayarlamak içn t!botlist-ayar")
  
  if (message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.`).then(msg => msg.delete(10000))
	if (message.channel.id == kanal) {
  if (!botid) return message.channel.send(`:no_entry: Botunun ID'sini yazmalısın.`).then(msg => msg.delete(10000))
  if (!prefix) return message.channel.send(`:no_entry: Botunun prefixini yazmalısın.`).then(msg => msg.delete(10000))
  if (!onaylımı) return message.channel.send(`:no_entry: Botunun Dbl onaylımı onu yazmalısın`).then(msg => msg.delete(10000))
  message.delete()
  const basvuruuu = new Discord.MessageEmbed()
  .setColor("PURPLE")
  .setDescription(`${message.author} adlı kullanıcının <@${botid}> adlı botu sıraya ekledi. Botu onaylanmayı bekliyor. `)
  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`
  [0 İzinli Ekle](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0)
  [8 İzinli Ekle](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8)
  `)
  .setTitle("Bot Ekletme")
    .setTitle("Bot Ekletme")
  .addField("Bot Sahibi", message.author.tag)
  client.channels.cache.get(basvuru).send(embed)
  client.channels.cache.get(log).send(basvuruuu)
  message.channel.send(`Bot ekleme isteğiniz alındı.`).then(msg => msg.delete(1000))
  }
}
    }
