const Discord = require("discord.js")
module.exports = {

    kod: "çiz-banner",
    async run (client, message, args){
        if (message.channel.type === 'dm') return


        let txt = args.join('+');
        if(!args[0]) return message.channel.send("**Lütfen Yazı Yazınız!**");
        
        let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor("Banner!")
        .setImage("https://dummyimage.com/2000x500/47d3a0/007f7f&text=" + txt)
        .setFooter("Banner");
        
        message.channel.send(embed);



    }
}