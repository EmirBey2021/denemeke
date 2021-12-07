const Discord = require('discord.js');

module.exports = {
    kod: "yaz",
    async run (client, message, args) {
            if (message.channel.type === 'dm') return

        let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(mesaj);
    }
}
  
