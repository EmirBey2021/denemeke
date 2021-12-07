module.exports = {
  kod: "unban",
  async run (client, message, args) {
    if (message.channel.type === 'dm') return
    let id = args[0]
    if (!message.member.hasPermission('BAN_MEMBERS')) return;
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return;
    if (isNaN(id)) return message.reply('Lütfen Geçerli Bir ID Giriniz');
    message.guild.fetchBans().then(ban => {
      if (ban.size === 0) return message.reply('Bu Sunucuda Hiç Kimse Yasaklanmamış');
      const banlanan = ban.find(b => b.user.id === id)
      if (!banlanan) return message.channel.send('Bu Kişi Bu Sunucuda Yasaklanmamış');
      message.guild.members.unban(banlanan.user)
      message.reply('Bu Kişinin Yasağı Kalkmıştır')
    })
  }
}
