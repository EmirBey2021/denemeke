const Discord = require('discord.js') // discord.js modülü tanımlıyoruz.
const ayarlar = require('./ayarlar.json')
const client = new Discord.Client() // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar
const { Client, MessageEmbed } = require('discord.js')// tanımlamalar
const chalk = require("chalk");// tanımlamalar
const ms = require('ms');// tanımlamalar
const fs = require('fs');// tanımlamalar
const db = require("wio.db") //tanımlamalar
const { setInterval } = require('timers');// tanımlamalar
const hedefimiz = require('./hedef.json');// tanımlamalar
const { type } = require('os');// tanımlamalar
const path = require('path');// tanımlamalar
const { Util } = require('discord.js');
require('./util/eventLoader.js')
const { time } = require('console');
client.commands= new Discord.Collection(); // komutları alıyoruz

const prefix = "t!"

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    if (typeof command.kod === 'object') {
      command.kod.forEach(x => {
        client.commands.set(x, command)
      })

    } else {
      client.commands.set(command.kod, command)
    }
}

client.on("error", console.error);

client.on('ready', () => {
    console.log(chalk.bold.yellow('Botumuz Aktif'))
    console.log(chalk.bold.green("Botumuz " + `${client .user .tag}`))
    const durumlar = [
      "Prefix: t!",
      "Discordumuza Katılmayı Unutmayın",
      `${client.users.cache.size} Kullanıcı`,
      `${client.guilds.cache.size} Sunucudayım!!!`,
      `t!yardım | Yardım Menüsü`,
      `${client.commands.size} Komutuz !!!`,
      'TurgayBOT Hizmetinizde'
    ]
    setInterval(function () {
      let durum = durumlar[(Math.floor(Math.random()*durumlar.length))]
      client.user.setActivity(durum, { type: "PLAYING"})
    }, 10000);
});

client.on('message', message => {
    if (message.content.startsWith('t!oylama')) {
      if (message.channel.type === 'dm') return
      const args = message.content.split(' ').slice(1)
      const botmesajı = args.join(" ")
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Oylama Yapmak İçin İzniniz Bulunmuyor');
      if (!botmesajı) return message.reply('Oylamanın Konusunu Belirtmediniz');
      message.delete(message.author)
      const embed = new MessageEmbed()
      .setTitle(':bar_chart: OYLAMA :bar_chart: ')
      .setDescription(botmesajı)
      .setFooter('TurgayBOT');
      message.channel.send({ embed: embed }).then( embedMessage => {
        embedMessage.react('✅')
        embedMessage.react('❌');
     })
    }
  })

  client.on("message", async  msg => {
  var mayfe = await db.fetch(`reklam_${msg.guild.id}`)
     if (mayfe == 'acik') {
         const birisireklammidedi = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
         if (birisireklammidedi.some(word => msg.content.includes(word))) {
           try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                   msg.delete();
                     return msg.reply('Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem !').then(msg => msg.delete(3000));


   msg.delete(3000);

             }
           } catch(err) {
             console.log(err);
           }
         }
     }
     else if (mayfe == 'kapali') {

     }
     if (!mayfe) return;
   })
   ;

  client.on("message", msg => {
    if (msg.content.startsWith('rolver')) {
      if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('Bu Komutu Kullanabilmek İçin `**YÖNETİCİ**` Yetkisine Sahip Olmalısın');
      let role = msg.mentions.roles.first();
      let member = msg.mentions.members.first();
      member.roles.add(role)
    }
  })

    client.on("message", msg => {
    if (msg.content.startsWith('rolal')) {
      if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('Bu Komutu Kullanabilmek İçin `**YÖNETİCİ**` Yetkisine Sahip Olmalısın');
      let role = msg.mentions.roles.first();
      let member = msg.mentions.members.first();
      member.roles.remove(role)
    }
  })

  const usersMap = new Map();
const LIMIT = 5;
const TIME = 3600;
const DIFF = 3000;

client.on('message', async(message) => {
    if(message.author.bot) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'muted');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            name : "muted",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muterole);
                message.channel.send('Spam Yaptığın İçin Mutelisin.');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send('Artık Muteli Değilsin.')
                }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})

  client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('t!kick')) {
      if (message.channel.type === 'dm') return
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick()
            .then(() => {
            const log = message.guild.channels.cache.find(channel => channel.name === 'log-kanalı')
             log.send(`${user.tag} İsimli Kişi Sunucudan Atılmıştır.`);
            })
            .catch(err => {
              message.reply('Bunu yapamam.');
              console.error(err);
            });
        } else {
          message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
        }
      } else {
        message.reply("Atılacak kişiyi yazmadın");
      }
    }
  });

  client.on("message", async message => {
  var anahtar = db.fetch(`caps_${message.guild.id}`)
  if(anahtar === "acik"){
    if(message.author.bot) return;
    if(message.content.length < 5) return;
    let capsengel = message.content.toUpperCase();
    let beyazliste =
      message.mentions.users.first() ||
      message.mentions.channels.first() ||
      message.mentions.roles.first()

   if(message.content == capsengel){
    if(!beyazliste && !message.content.includes("@everyone") && !message.content.includes("@here") && !message.member.hasPermission("BAN_MEMBERS"))
      {
        message.delete().then(message.channel.send("Büyük harf kullanmamalısın.!!!").then(i => i.delete(10000)))

      }}




  }
  if(!anahtar) return;
})
//capsengel son

//-------------------- Ever Here Engel --------------------//

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var e = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Bu Sunucuda Everyone ve Here Yasak!`);
        msg.channel.send(e);
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

//-------------------- Ever Here Engel --------------------//

  //************AFK SİSTEM***************//
client.on('message', message=> {
let afkmı = db.fetch(`afk_kişi_${message.author.id}`)
if(afkmı){
    let d1=["t!afk"]
    if(d1.some(word => message.content.includes(word)) ){


    }else{

        db.delete(`afk_kişi_${message.author.id}`);
        db.delete(`afk_${message.author.id}`);

        const msg1 = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`**AFK durumunuz kaldırıldı!!**`)
        .setFooter("TurgayBOT")
       return message.channel.send(msg1)
    }

}

const etiket = message.mentions.users.first()
if(!etiket){



}else if(etiket){


    let sorgu = db.fetch(`afk_kişi_${etiket.id}`)
if(sorgu){
    let afkdurum = db.fetch(`afk_${etiket.id}`)
message.delete()
const msg2 = new Discord.MessageEmbed()
.setColor('GREEN')
.setAuthor(etiket.username, etiket.avatarURL)
.setDescription(`${etiket.username} Adlı kullanıcı afk. Afk Olma Sebebi : **${afkdurum}**`)
.setFooter("TurgayBOT")
message.channel.send(msg2)
}else{


}
}

});

//************AFK SİSTEM BİTİŞ********//

////log kanalı////

client.on("messageDelete", async message => {

  if (message.author.bot) return;

  var user = message.author;

  var kanal = await db.fetch(`modlogK_${message.guild.id}`)
  if (!kanal) return;
var kanal2 = message.guild.channels.find('name', kanal)

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("ID", message.author.id, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  kanal2.send(embed);

});

client.on("messageUpdate", async (oldMsg, newMsg) => {

  if (oldMsg.author.bot) return;

  var user = oldMsg.author;

  var kanal = await db.fetch(`modlogK_${oldMsg.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMsg.guild.channels.find('name', kanal)

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
  .addField("Kullanıcı Tag", oldMsg.author.tag, true)
  .addField("ID", oldMsg.author.id, true)
  .addField("Eski Mesaj", "```" + oldMsg.content + "```")
  .addField("Yeni Mesaj", "```" + newMsg.content + "```")
  .setThumbnail(oldMsg.author.avatarURL)
  kanal2.send(embed);

});

client.on("roleCreate", async role => {

  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal2.send(embed);

});

client.on("roleDelete", async role => {

  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal2.send(embed);

});

client.on("roleUpdate", async role => {

  if (!log[role.guild.id]) return;

 var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  kanal2.send(embed);

});

client.on('voiceStateUpdate', async (oldMember, newMember) => {



  var kanal = await db.fetch(`modlogK_${oldMember.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMember.guild.channels.find('name', kanal)

  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**${newMember.user.tag}** adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal2.send(embed);

  } else if(newUserChannel === undefined){

    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`**${newMember.user.tag}** adlı kullanıcı bir sesli kanaldan çıkış yaptı!`)
    kanal2.send(embed);

  }

  client.on('channelCreate', async (channel,member) => {
    var kanal = await db.fetch(`modlogK_${member.guild.id}`)
    const hgK = member.guild.channels.find('name', kanal)
    if (!hgK) return;
        if (!channel.guild) return;
            if (channel.type === "text") {
                var embed = new Discord.MessageEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
                .setFooter(`ID: ${channel.id}`)
                embed.send(embed);
            };
            if (channel.type === "voice") {
                var embed = new Discord.MessageEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            }

    })

    client.on('channelDelete', async channel => {
            const fs = require('fs');
        var kanal = await db.fetch(`modlogK_${channel.guild.id}`)

        const hgK = channel.guild.channels.find('name', kanal)
        if (!hgK) return;
            if (channel.type === "text") {
                let embed = new Discord.MessageEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            };
            if (channel.type === "voice") {
                let embed = new Discord.MessageEmbed()
                .setColor(3066993)
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
                .setFooter(`ID: ${channel.id}`)
                hgK.send({embed});
            }

    });

});

client.on("guildCreate", guild => {
const tesekkurler = new Discord.MessageEmbed()
.setColor("BLACK")
.setDescription(`Beni sunucuya eklediğin için teşekkürler herhangi bir sorunda destek sunucuma gelebilirsin.(Merak etme bu mesaj sadece sana gönderildi.) [Destek Sunucum](https://discord.gg/7u65Rra)`)
guild.owner.send(tesekkurler)


});

client.on('guildMemberAdd', member => {
    let durum= db.fetch(`panel_durum_${member.guild.id}`)
    if(!durum){

        db.set(`panel_durum_${member.guild.id}`, `kapalı`)


    }else if(durum==='açık'){

        var guild = member.guild
        var üyeler = guild.members.cache

        let category= db.fetch(`panel_category_${member.guild.id}`)
        let üye= db.fetch(`panel_üye_${member.guild.id}`)
        let bot= db.fetch(`panel_bot_${member.guild.id}`)
        const bul1 = member.guild.channels.cache.find(channel => channel.id === category);
        const bul2 = member.guild.channels.cache.find(channel => channel.id === üye);
        const bul3 = member.guild.channels.cache.find(channel => channel.id === bot);



                if(bul1&&bul2&&bul3){

                    bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);

                }else if(bul1&&!bul2&&!bul3){

                }else if(!bul1&&bul2&&!bul3){
         bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);

                }else if(!bul1&&!bul2&&bul3){
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);
                }else if(bul1&&bul2&&!bul3){
                    bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);
                }else if(bul1&&!bul2&&bul3){
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);

                }else if(!bul1&&bul2&&bul3){
                    bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);


                }else if(!bul1&&!bul2&&!bul3){



                }










    }

});
client.on('guildMemberRemove', member => {

    let durum= db.fetch(`panel_durum_${member.guild.id}`)
    if(!durum){




    }else if(durum==='açık'){

        var guild = member.guild
        var üyeler = guild.members.cache

        let category= db.fetch(`panel_category_${member.guild.id}`)
        let üye= db.fetch(`panel_üye_${member.guild.id}`)
        let bot= db.fetch(`panel_bot_${member.guild.id}`)
        const bul1 = member.guild.channels.cache.find(channel => channel.id === category);
        const bul2 = member.guild.channels.cache.find(channel => channel.id === üye);
        const bul3 = member.guild.channels.cache.find(channel => channel.id === bot);



                if(bul1&&bul2&&bul3){

                    bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);

                }else if(bul1&&!bul2&&!bul3){

                }else if(!bul1&&bul2&&!bul3){
         bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);

                }else if(!bul1&&!bul2&&bul3){
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);
                }else if(bul1&&bul2&&!bul3){
                    bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);
                }else if(bul1&&!bul2&&bul3){
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);

                }else if(!bul1&&bul2&&bul3){
                    bul2.setName(`Üye Sayısı-•-${üyeler.filter(üye2 => !üye2.user.bot).size}`);
                    bul3.setName(`Bot Sayısı-•-${üyeler.filter(üye2 => üye2.user.bot).size}`);


                }else if(!bul1&&!bul2&&!bul3){



                }









    }
});

  client.on('message', message => {
    if (!message.guild) return;
  if (message.content.startsWith('t!ban')) {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
      if (message.channel.type === 'dm') return
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .ban()
            .then(() => {
            const log = message.guild.channels.cache.find(channel => channel.name === '〖📂〗log-kanalı')
             log.send(`${user.tag} İsimli Kişi Sunucudan Yasaklanmıştır.`)
            })
            .catch(err => {
              message.reply('Bunu yapamam.');
              console.error(err);
            });
        } else {
          message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
        }
      } else {
        message.reply("Yasaklanacak kişiyi yazmadın.");
      }
    }
  });

  client.on("message", async msg => {
  const gereksiz = await db.fetch(`saas_${msg.guild.id}`);
  if (gereksiz === "aktif") {
    if (
      msg.content.toLowerCase() == "selam" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "s.a" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "selamm" ||
      msg.content.toLowerCase() == "saa" ||
      msg.content.toLowerCase() == "saaa"
    )
        return msg.reply("Aleyküm selam hoşgeldin nasılsın, İyimisin?");
    } else if (gereksiz === "deaktif") {
  }
  if (!gereksiz) return;
});

client.on("messageDelete", async (message) => {

    if (message.author.bot || message.channel.type == "dm") return;

    let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

    if (!log) return;

    const embed = new Discord.MessageEmbed()

      .setTitle(message.author.username + " | Mesaj Silindi")

      .addField("Kullanıcı: ", message.author)

      .addField("Kanal: ", message.channel)

      .addField("Mesaj: ", "" + message.content + "")

    log.send(embed)

  })

client.on("messageUpdate", async (oldMessage, newMessage) => {

    let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

    if (!modlog) return;

    let embed = new Discord.MessageEmbed()

    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

    .addField("**Eylem**", "Mesaj Düzenleme")

    .addField("**Mesajın sahibi**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)

    .addField("**Eski Mesajı**", `${oldMessage.content}`)

    .addField("**Yeni Mesajı**", `${newMessage.content}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())

    .setThumbnail(oldMessage.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

  });

client.on("channelCreate", async(channel) => {

    let modlog = await db.fetch(`log_${channel.guild.id}`);

      if (!modlog) return;

      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

      let kanal;

      if (channel.type === "text") kanal = `<#${channel.id}>`

      if (channel.type === "voice") kanal = `\`${channel.name}\``

      let embed = new Discord.MessageEmbed()

      .setAuthor(entry.executor.username, entry.executor.avatarURL())

      .addField("**Eylem**", "Kanal Oluşturma")

      .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

      .addField("**Oluşturduğu Kanal**", `${kanal}`)

      .setTimestamp()

      .setColor("RANDOM")

      .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

      .setThumbnail(channel.guild.iconUR)

      client.channels.cache.get(modlog).send(embed)

      })

client.on("channelDelete", async(channel) => {

    let modlog = await db.fetch(`log_${channel.guild.id}`);

      if (!modlog) return;

      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

      let embed = new Discord.MessageEmbed()

      .setAuthor(entry.executor.username, entry.executor.avatarURL())

      .addField("**Eylem**", "Kanal Silme")

      .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

      .addField("**Silinen Kanal**", `\`${channel.name}\``)

      .setTimestamp()

      .setColor("RANDOM")

      .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

      .setThumbnail(channel.guild.iconURL)

      client.channels.cache.get(modlog).send(embed)

      })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Rol Oluşturma")

  .addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

  .addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

  .setTimestamp()

  .setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

  .setColor("RANDOM")

  .setThumbnail(role.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

  })

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Rol Silme")

  .addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

  .addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

  .setTimestamp()

  .setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

  .setColor("RANDOM")

  .setThumbnail(role.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

  })

client.on("emojiCreate", async(emoji) => {

  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Emoji Oluşturma")

  .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

  .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

  .setThumbnail(emoji.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

  client.on("emojiDelete", async(emoji) => {

  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Emoji Silme")

  .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

  .addField("**Silinen emoji**", `${emoji}`)

  .setTimestamp()

  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

  .setColor("RANDOM")

  .setThumbnail(emoji.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Emoji Güncelleme")

  .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

  .addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

  .addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

  .setThumbnail(oldEmoji.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Yasaklama")

  .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

  .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

  .addField("**Yasaklanma sebebi**", `${entry.reason}`)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

  .setThumbnail(guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Yasak kaldırma")

  .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

  .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

  .setThumbnail(guild.iconURL)

  client.channels.cache.get(modlog).send(embed)
})

//sayaç
client.on('guildMemberAdd', async member => {
  let sayaç = db.fetch(`onlycode.sayaç_${member.guild.id}`)
  let sayaçk = db.fetch(`onlycode.sayaçk_${member.guild.id}`)
  if(!sayaç) return;
  if(!sayaçk) return;
  if(member.guild.memberCount >= sayaç) {

  client.channels.cache.get(sayaçk).send(`Tebrikler! Sunucunuz başarıyla ayarlanmış olan \`${sayaç}\` kişiye ulaştı. Sayaç sistemi sıfırlandı.`)
  db.delete(`onlycode.sayaç_${member.guild.id}`)
  db.delete(`onlycode.sayaçk_${member.guild.id}`)
  } else {
  client.channels.cache.get(sayaçk).send(`╔▬▬▬▬▬▬▬ <a:alevtacc:726390324347404328> ▬▬▬▬▬▬▬▬▬
  ║<a:maviyildiz:793539752858877952> Sunucuya Hoşgeldin **${member}**
  ║<a:maviyildiz:793539752858877952> Otomatik Rolün Verildi
  ║<a:maviyildiz:793539752858877952> Seninle Beraber **${member.guild.memberCount}** Kişiyiz !
  ╚▬▬▬▬▬▬▬<a:alev:795643004228337665> ▬▬▬▬▬▬▬▬▬`)


  }
  })

  client.on('guildMemberRemove', async member => {
  let sayaç = db.fetch(`onlycode.sayaç_${member.guild.id}`)
  let sayaçk = db.fetch(`onlycode.sayaçk_${member.guild.id}`)
  if(!sayaç) return;
  if(!sayaçk) return;
  if(member.guild.memberCount >= sayaç) {

  client.channels.get(sayaçk).send(`Tebrikler! Sunucunuz başarıyla ayarlanmış olan \`${sayaç}\` kişiye ulaştı. Sayaç sistemi sıfırlandı.`)
  db.delete(`onlycode.sayaç_${member.guild.id}`)
  db.delete(`onlycode.sayaçk_${member.guild.id}`)
  } else {

  client.channels.cache.get(sayaçk).send(`╔▬▬▬▬▬▬▬<a:maviyildiz:793539752858877952> ▬▬▬▬▬▬▬▬▬
  ║<a:maviyildiz:793539752858877952> Sunucudan Ayrıldı **${member}**
  ║<a:maviyildiz:793539752858877952> **${sayaç}** Kişi Olmamıza **${sayaç - member.guild.memberCount}** Kişi Kaldı
  ║<a:maviyildiz:793539752858877952> Toplam **${member.guild.memberCount}** Kişiyiz !
  ╚▬▬▬▬▬▬▬ <a:maviyildiz:793539752858877952> ▬▬▬▬▬▬▬▬▬`)
  }


  })

  client.on("guildMemberAdd", async member => {
    let kanal = await db.fetch(`otorolkanal_${member.guild.id}`);

    let rol = await db.fetch(`otorol_${member.guild.id}`);
    if (!kanal) return;
    if (!rol) return;
    client.channels.cache.get(kanal).send(`╔▬▬▬▬▬▬▬ <a:alev:795643004228337665> ▬▬▬▬▬▬▬▬▬
  ║<a:maviyildiz:793539752858877952> Sunucuya Hoşgeldin **${member}**
  ║<a:maviyildiz:793539752858877952> Otomatik Rolün Verildi
  ║<a:maviyildiz:793539752858877952> Seninle Beraber **${member.guild.memberCount}** Kişiyiz !
  ╚▬▬▬▬▬▬▬<a:alev:795643004228337665> ▬▬▬▬▬▬▬▬▬`)

    member.roles.add(rol)
  });
//sayaçson

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return message.channel.send(`‏‏‏‏‏‏‏‏   `);

        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(ayarlar.token)
