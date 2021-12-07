const { level } = require("chalk");

module.exports = {
    kod: "sunucukur-botlist",
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu Komutu Kullanmak İçin Yetkiniz Yok')
        message.guild.channels.cache.forEach((item, i) => {
            item.delete()
        });
        message.guild.channels.create('🎓 • Sunucu', { type: "category"}).then(sunucu => {
            message.guild.channels.create('🔰 • Genel', { type: "category"}).then(genel => {
                message.guild.channels.create('🤖 • Botlist', { type: "category"}).then(botlist => {
                    message.guild.channels.create('💬 • Sohbet', { type: "text"}).then(sohbet => {
                        sohbet.setParent(genel.id)
                    })
                    message.guild.channels.create('🤖 • bot-komut', { type: "text"}).then(botkomut => {
                        botkomut.setParent(genel.id)
                    })
                    message.guild.channels.create('🎇 • level-log', { type: "text"}).then(levellog => {
                        levellog.setParent(genel.id)
                    })
                    message.guild.channels.create('📢 • duyuru', { type: "text"}).then(duyuru => {
                        duyuru.setParent(sunucu.id)
                    })
                    message.guild.channels.create('📌 • kurallar', { type: "text"}).then(kurallar => {
                        kurallar.setParent(sunucu.id)
                    })
                    message.guild.channels.create('🌈 • gelen-giden', { type: "text"}).then(gelengiden => {
                        gelengiden.setParent(sunucu.id)
                    })
                    message.guild.channels.create('👽 • çekiliş', { type: "text"}).then(çekiliş => {
                        çekiliş.setParent(sunucu.id)
                    })
                    message.guild.channels.create('🤖 • bot-ekle', { type: "text"}).then(botekle => {
                        botekle.setParent(botlist.id)
                    })
                    message.guild.channels.create('🤖 • bot-kurallar', { type: "text"}).then(botekle => {
                        botekle.setParent(botlist.id)
                    })
                    message.guild.channels.create('🤖 • bot-test', { type: "text"}).then(botekle => {
                        botekle.setParent(botlist.id)
                    })
                })
            })
        })
    }
}