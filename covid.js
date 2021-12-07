const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    kod: ["covid", "corona"],

    async run (client, message, args){
        if (message.channel.type === 'dm') return

        let countries = args.join(" ");

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Eksik Birim')
        .setColor(0xFF0000)
        .setDescription('Lütfen Bir Ülke Gir. Örneğin: t!turkey')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "global"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Global COVID-19 İstatistikleri 🌎`)
                .addField('Onaylanmış Vakalar', confirmed)
                .addField('Kurtarılan Hastalar', recovered)
                .addField('Ölümler', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`**${countries}** COVID-19 İstatistikleri`)
                .addField('Onaylanmış Vakalar', confirmed)
                .addField('Kurtarılan Hastalar', recovered)
                .addField('Ölümler', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('Geçersiz Ülke')
            })
        }
    }
}
