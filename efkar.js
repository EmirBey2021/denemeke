const discord = require('discord.js')

module.exports = {
    kod: ["efkar", "efkar-ölç", "efkarım"],
    async run (client, message, args) {
        if (message.channel.type === 'dm') return
        var boksmakinesi = [
            "Efkarın %1",
        "Efkarın %2",    
        "Efkarın %3",    
        "Efkarın %4",    
        "Efkarın %5",    
        "Efkarın %6",    
        "Efkarın %7",    
        "Efkarın %8",    
        "Efkarın %9",    
        "Efkarın %10",    
        "Efkarın %11",    
        "Efkarın %12",    
        "Efkarın %13",    
        "Efkarın %14",    
        "Efkarın %15",    
        "Efkarın %16",    
        "Efkarın %17",    
        "Efkarın %18",    
        "Efkarın %19",    
        "Efkarın %20",    
        "Efkarın %21",    
        "Efkarın %22",    
        "Efkarın %23",    
        "Efkarın %24",    
        "Efkarın %25",    
        "Efkarın %26",    
        "Efkarın %27",    
        "Efkarın %28",    
        "Efkarın %29",    
        "Efkarın %30",    
        "Efkarın %31",    
        "Efkarın %32",    
        "Efkarın %33",    
        "Efkarın %34",    
        "Efkarın %35",    
        "Efkarın %36",    
        "Efkarın %37",    
        "Efkarın %38",    
        "Efkarın %39",    
        "Efkarın %40",    
        "Efkarın %41", 
        "Efkarın %42",    
        "Efkarın %43",    
        "Efkarın %44",    
        "Efkarın %45",    
        "Efkarın %46",    
        "Efkarın %47",    
        "Efkarın %48",    
        "Efkarın %49",    
        "Efkarın %50",    
        "Efkarın %51",    
        "Efkarın %52",    
        "Efkarın %53",    
        "Efkarın %54",    
        "Efkarın %55",    
        "Efkarın %55",    
        "Efkarın %56",    
        "Efkarın %57",    
        "Efkarın %58",    
        "Efkarın %59",    
        "Efkarın %60",    
        "Efkarın %61",    
        "Efkarın %62",    
        "Efkarın %63",    
        "Efkarın %64",    
        "Efkarın %65",    
        "Efkarın %66",    
        "Efkarın %67",    
        "Efkarın %68",    
        "Efkarın %69",    
        "Efkarın %70",    
        "Efkarın %71",    
        "Efkarın %72",    
        "Efkarın %73",    
        "Efkarın %74",    
        "Efkarın %75",    
        "Efkarın %76",    
        "Efkarın %77",    
        "Efkarın %78",    
        "Efkarın %79",    
        "Efkarın %80",    
        "Efkarın %81",    
        "Efkarın %82",    
        "Efkarın %83",    
        "Efkarın %84",    
        "Efkarın %85",    
        "Efkarın %86",    
        "Efkarın %87",    
        "Efkarın %88",    
        "Efkarın %89",    
        "Efkarın %90",  
        "Efkarın %91",
        "Efkarın %92",  
        "Efkarın %93",  
        "Efkarın %94", 
        "Efkarın %95",  
        "Efkarın %96",  
        "Efkarın %97",  
        "Efkarın %98",  
        "Efkarın %99",
        "Efkarın %100",  
                ];
 var cevap = boksmakinesi[Math.floor(Math.random() * boksmakinesi.length)];

 const embed = new discord.MessageEmbed()
 .setColor(`BLUE`)
 .setDescription(cevap)
 .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
 message.channel.send(embed)
    }
}