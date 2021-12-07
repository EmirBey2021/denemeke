const fs = require('fs')

class DB {

    constructor(){

    }

    /**
     yaz = set
     db.set("prefix", "!")
     <DB>.yaz("prefix", "!")
     */

     yaz(veri, değer){
         const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
        dosya[veri] = değer 
        return fs.writeFileSync("database.json", JSON.stringify(dosya, null, 2))
        } 

        /*
        bul => fetch/get
        db.fetch('prefix')
        <DB>.bul("prefix")
        */
       
   bul(veri){
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
    if (!dosya[veri]) throw new TypeError('Veri Bulunamadı\n' + __dirname)
    return dosya[veri]
    } 
    
    /**
     kontrol => has
     db.has("prefix")
     <DB>.kontrol("prefix")
     */

     kontrol(veri){
         const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
        return dosya[veri] ? true : false
    }

    /**
     sil => delete
     db.delete("prefix")
     <DB>.sil("prefix")
     */

     sil(veri){
         if (!veri) throw new TypeError("Veri Girmediniz")
         const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
         if (!dosya[veri]) throw new TypeError('Veri Bulunamadı\n' + __dirname)
         delete dosya[veri]
         return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
        }

    /**
     yedekle = backup
     db.backup("veri.json")
     <DB>.yedekle("veri")
     */

     yedekle(dosyaAdı){
         if (!dosyaAdı) throw new TypeError ("Dosya Adı Girmediniz")
         const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
         return fs.writeFileSync(`${dosyaAdı}.json`, JSON.stringify(dosya, null, 2))
     }

     /*
      topla => add
      db.add("puan", 5)
      <DB>.topla("puan", 5)
      */

      topla(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz")
        if (typeof değer !== "number") throw new TypeError('Değer olarak bir sayı giriniz')
        if (!this.kontrol(veri)) throw new TypeError("Veri olarak girdiğiniz değer veritabanında yok")
        if (typeof this.bul(veri) !== "number") throw new TypeError("Sayı Ekleyeceğiniz Değer Bir Sayı Olmalı")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
        dosya[veri] += değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
  
    }

    /**
     çıkar => substr
     db.substr("puan", 5)
     <DB>.çıkar("puan", 5)
     */

     çıkar(veri, değer){
          if (!veri) throw new TypeError("Veri Girmediniz")
        if (typeof değer !== "number") throw new TypeError('Değer olarak bir sayı giriniz')
        if (!this.kontrol(veri)) throw new TypeError("Veri olarak girdiğiniz değer veritabanında yok")
        if (typeof this.bul(veri) !== "number") throw new TypeError("Sayı Ekleyeceğiniz Değer Bir Sayı Olmalı")
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
        dosya[veri] -= değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }

    /**
     sıfırla => -
     <DB>.sıfırla()
     */
    

     sıfırla(){
         const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'))
         return fs.writeFileSync('database.json', JSON.stringify({}, null, 2))
     }


}



module.exports = new DB