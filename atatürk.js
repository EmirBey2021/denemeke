const { Message } = require("discord.js")

module.exports = {

    kod: "atatürk",
    async run (client, message, args){
        if (message.channel.type === 'dm') return

       

        const mesaj = [
        "https://media.giphy.com/media/Xc4dop7WgINtfqalR4/giphy.gif",
        "https://media.giphy.com/media/VdVwQxkrlOaKXswqw8/giphy.gif",
        "https://media.giphy.com/media/ZbMu6BSZQd8jPnlYCp/giphy.gif",
        "https://media.giphy.com/media/jRYcPFsnpMRtkLTZy0/giphy.gif",
        "https://media.giphy.com/media/iIGsxKX0p6Pyk7sRzf/giphy.gif",
          
    ];

        
        const rastgelemesaj = mesaj[Math.floor(Math.random() *mesaj.length)]; //mesajların içinden rastgelemesaj verir<<<<<<<<<<

message.channel.send(rastgelemesaj); //rastgelemesajlardan birini mesaj olarak yaz.<<<<<<
 }

}