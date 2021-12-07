const { Message } = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {

    kod: "zarat",
    async run (client, message, args){
        if (message.channel.type === 'dm') return
        const mesaj = [
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **1**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **2**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **3**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **4**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **5**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **6**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **7**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **8**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **9**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **10**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **11**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **12**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **13**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **14**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **15**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **16**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **17**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **18**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **19**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **20**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **21**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **22**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **23**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **24**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **25**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **26**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **27**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **28**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **29**',
            `**${message.author.username}** ` + '__Zar Attı Ve Zar Numarası__ **30**',
    ];

        
        const rastgelemesaj = mesaj[Math.floor(Math.random() *mesaj.length)]; //mesajların içinden rastgelemesaj verir<<<<<<<<<<

message.channel.send(rastgelemesaj); //rastgelemesajlardan birini mesaj olarak yaz.<<<<<<
 }

}