const Discord = require('discord.js');
const db = require('quick.db');
const kobscode = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || kobscode.prefix;
  let özellik = await db.fetch(`kayitisimtemizleyici_${message.guild.id}`);
  let kobs = args[0];
  if(!kobs || kobs !== "aç" && kobs !== "kapat" && kobs !== "ac") return message.reply(`İsim temizleme özelliğinin açık mı kapalı mı olacağını belirtmelisin! \n\`Örn:\` ${prefix}kayıt-isim-temizleyici aç/kapat`)

  if(kobs === "aç" || kobs === "ac") {
    if(özellik) return message.reply('İsim temizleyici zaten aktif! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanamazlar.')
    await db.set(`kayitisimtemizleyici_${message.guild.id}`, "acik")
    message.reply(`Kayıt isim temizleyici başarıyla aktif edildi! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanamayacaklar.`)
    return
  }

  if(kobs === "kapat") {
    if(!özellik) return message.reply('İsim temizleyici zaten kapalı! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanabilirler.')
    await db.delete(`kayitisimtemizleyici_${message.guild.id}`)
    message.reply(`Kayıt isim temizleyici başarıyla devre dışı bırakıldı! Kayıt olan kullanıcılar isimlerinde alfabe dışı karakter kullanabilirler.`)
    return
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit-isim-temizleyici'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-isim-temizleyici',
  description: 'Kayıt isim temizleyici - Kayıt sistemi ',
  usage: 'kayıt-isim-temizleyici aç/kapat',
  kategori: 'yetkili'
};