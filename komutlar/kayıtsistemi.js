const Discord = require('discord.js');
const db = require('quick.db');
const kobscode = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || kobscode.prefix;
  const kobscode = new Discord.RichEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription(`**Kayıt Sistemi Bilgi**`)
  .addField(prefix + "kayıt-kanal-ayarla #kanal", "Üyelerin kayıt işlemlerini gerçekleştirdikleri kanal.")
  .addField(prefix + "kayıt-log-ayarla #kanal", "Kayıt işleminin loglanacağı kanal.")
  .addField(prefix + "kayıt-isim-ayarla (uye) (yas)", "Kayıt olan üyelerin isimlerini ayarlama şekli. `Örn` Ogün | 19 \n`(uye)` isim, `(yas)` ise yaşı ifade eder. (Yaş eklemek zorunda değilsiniz)")
  .addField(prefix + "kayıt-alınacak-rol @rol/rolID", "Kayıt olan üyeden otomatik kaldırılacak rol.")
  .addField(prefix + "kayıt-verilecek-rol @rol/rolID", "Kayıt olan üyeye otomatik verilecek rol.")
  .addField(prefix + "kayıt-hoşgeldin-mesajı mesaj", `Üye girince kayıt kanalına gönderilecek mesaj. \n\`Örn:\` Hoş geldin (uye), kayıt olmak için ${prefix}kayıt isim yaş`)
  .addField(prefix + "kayıt-isim-temizleyici aç/kapat", `Bu özellik açık ise üyeler, isimlerinde alfabe dışı karakterler kullanamazlar.`)
  .addField(prefix + "kayıt-sistemi-kapat", `Kayıt sistemi ayarlarını sıfırlar ve devre dışı bırakır.`)
  .setFooter(client.user.username + " Kayıt Sistemi", client.user.avatarURL)
  .setTimestamp()
  message.channel.send(kobscode)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayitsistemi', 'kayıt-sistemi'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsistemi',
  description: 'Üye kayıt sistemi bilgi ',
  usage: 'kayıtsistemi',
  kategori: 'yetkili'
};