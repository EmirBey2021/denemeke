const Discord = require('discord.js');
const { delay, randomRange, verify } = require('../util/Util');
const words = ['çikolata', 'vortex', 'odun', 'bomba', 'süt', 'şimşek', 'yıldırım', 'patlat', 'savaş', 'kelime', 'yok et', 'bilmem', 'öldür', 'sonsuzluk', 'gerçekçilik', 'oyunculuk', 'kazanmak', 'kayıt'];

module.exports = {
	kod: ["fast-type", "yazankazanır", "yazan-kazanır"],
	async run (client, message, args) {
		      if (message.channel.type === 'dm') return

		
  this.fighting = new Set();
  
  let opponent = message.mentions.users.first()
	if (!opponent) return message.reply("Oynamak istediğin kişiyi etiketlemelisin!")
  
  if (opponent.bot) return message.reply('Botlar ile oynayamazsın!');
		if (opponent.id === message.author.id) return message.reply('Kendin ile kapışamassın!');
		if (this.fighting.has(message.channel.id)) return message.reply('Kanal başına sadece bir meydan okuma gelebilir!');
		this.fighting.add(message.channel.id);
		try {
			await message.channel.send(`${opponent}, bu meydan okumayı kabul ediyor musun? (\`evet\` veya \`hayır\` olarak cevap veriniz.)`);
			const verification = await verify(message.channel, opponent);
			if (!verification) {
				this.fighting.delete(message.channel.id);
				return message.reply('Meydan okuman reddedildi...');
			}
			await message.channel.send('Hazırlanın kelime geliyor...').then(m => {m.delete(3000)});
			const word = words[Math.floor(Math.random() * words.length)];
			await message.channel.send(`ŞİMDİ \`${word.toUpperCase()}\` YAZ!`);
			await message.channel.send(`_Kelimeyi tamamen küçük harfle yazınız._`);
			const filter = res => [opponent.id, message.author.id].includes(res.author.id) && res.content.toLowerCase() === word;
			const winner = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 30000
			});
			this.fighting.delete(message.channel.id);
			if (!winner.size) return message.channel.send('Kimse kazanmadı, berabere bitti!');
			return message.channel.send(`Hızlıymışsın! Tebrikler ${winner.first().author} Kazandın!`);
		} catch (err) {
			this.fighting.delete(message.channel.id);
			throw err;
		}
  
  }
	}

 