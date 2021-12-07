const Discord = require('discord.js')
const db= require('wio.db');
module.exports = {

    kod: "afk",
    async run (client, message, args){
        if (message.channel.type === 'dm') return
        let afkmı = db.fetch(`afk_kişi_${message.author.id}`)
        if(afkmı){


            db.delete(`afk_kişi_${message.author.id}`);
            db.delete(`afk_${message.author.id}`);

            const msg1 = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`**AFK durumunuz kaldırıldı!!**`)
            .setFooter("TurgayBOT")
           return message.channel.send(msg1)


        }else{
        var salvokullanıcı = message.author;
        var salvosebep = args.slice(0).join("  ");
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Afk Olmak İçin Bir Sebep Belirtin.\n\n Örnek Kullanım : t!afk <sebep>`)
        .setFooter("TurgayBOT")
        if(!salvosebep) return message.channel.send(embed)
        db.set(`afk_${salvokullanıcı.id}`, salvosebep);
        db.set(`afk_kişi_${salvokullanıcı.id}`, salvokullanıcı.id);
        const afk = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Afk Moduna Başarıyla Girildi. Afk Olma Sebebi : **${salvosebep}**`)
        .setFooter("TurgayBOT")
        message.channel.send(afk)
    }

    }
    }
