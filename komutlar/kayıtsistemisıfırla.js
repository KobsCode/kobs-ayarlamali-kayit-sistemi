const Discord = require('discord.js');
const db = require('quick.db');
const kobscode = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || kobscode.prefix;
  try {
    await db.delete(`kayitkanali_${message.guild.id}`);
    await db.delete(`kayitlogkanali_${message.guild.id}`);
    await db.delete(`kayitisimsekli_${message.guild.id}`);
    await db.delete(`kayitalinacakrol_${message.guild.id}`);
    await db.delete(`kayitverilecekrol_${message.guild.id}`);
    await db.delete(`kayithosgeldinmesaji_${message.guild.id}`);
    await db.delete(`kayitisimtemizleyici_${message.guild.id}`);
    await message.reply('Tüm kayıt sistemi özellikleri sıfırlandı ve özellik devre dışı bırakıldı!')
  } catch(err) { console.log(err) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit-sistemi-kapat'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-sistemi-kapat',
  description: 'Kayıt sistemi ayarlarını sıfırlar ve devre dışı bırakır. - Kayıt sistemi ',
  usage: 'kayıt-sistemi-kapat',
  kategori: 'yetkili'
};