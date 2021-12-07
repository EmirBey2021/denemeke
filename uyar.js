const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  kod: ["uyar", "warn"],
  async run (client, message, args) {
    if (message.channel.type === 'dm') return
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Bu Komut İçin Yetkin Yok')
    	let opponent = message.mentions.users.first()
        if (opponent.bot) return message.reply('Botları Uyaramazsın');
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Lütfen Uyarılacak Kişiyi Giriniz.')
      return
    }

      args.shift()

      const guildId = message.author.id
      const userId = message.mentions.users.first()
      const reason = args.join(' ')
      if (!reason) return message.reply('Bir Sebep Belirt')

      var embed = new MessageEmbed()

      .setTitle('UYARI')
      .setColor('RANDOM')
      .addField('Uyaran', `<@${guildId}>`)
      .addField('Uyarılan', userId)
      .addField('Sebep', reason)
      try{

}catch(e){

console.log(e);
}
      message.channel.send(embed)
  }
}