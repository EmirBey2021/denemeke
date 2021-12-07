const db = require('wio.db');
const Discord = require('discord.js')

module.exports = {
  kod: "capsengel",
  async run (client, message, args, func) {



   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);


   if(!args[0]) return message.channel.send("Doğru kullanım `t!capsengel aç/kapat`")
       if(args[0] === "aç"){
      if(db.has(`caps_${message.guild.id}`)) return message.reply("Zaten açık")
     db.set(`caps_${message.guild.id}`, 'acik')
     message.channel.send(`Capslock engel başarıyla açıldı`)
    }
     if(args[0] === "kapat") {
     if(!db.has(`caps_${message.guild.id}`)) return message.reply("Zaten kapalı")
     db.delete(`caps_${message.guild.id}`)
     message.channel.send('Capslock engel başarıyla kapatıldı.')   }




 }
}
