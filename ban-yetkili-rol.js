const Discord = require('discord.js');
const db = require('wio.db');

module.exports = {

    kod: "ban-yetkili-rol",
    async run (client, message, args){
        if (message.channel.type === 'dm') return
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın')

    let rol = message.mentions.roles.first()
    if(!rol) return message.channel.send('```Bir rol etiketlemelisin (Eğer rolü bulamıyorsan kanalı görebildiğinden veya etkietlenebilir olduğundan emin ol)```')
   db.set(`banrol_${message.guild.id}`, rol.id)
   return message.channel.send('Ban yetkili rolü <@&' + rol+ '> Olarak ayarlandı')
} 
}