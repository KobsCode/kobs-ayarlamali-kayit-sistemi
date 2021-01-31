const Discord = require('discord.js');
const db = require('quick.db');
const kobscode = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || kobscode.prefix;
  let kobs = args.join(' ')
  .replace('(yaş)', '(yas)');
  if(!args[0] || !(kobs).includes('(uye)')) return message.reply(`Üyenin isminin nasıl kaydedileceğini belirtmelisin! (Yaş isteğe bağlıdır) \n\`Örn:\` ${prefix}kayıt-isim-ayarla (uye) | (yas)`)
  await db.set(`kayitisimsekli_${message.guild.id}`, kobs)
  message.reply(`Kayıt isim şekli başarıyla ayarlandı!`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit-isim-ayarla'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-isim-ayarla',
  description: 'Kayıt isim ayarlama - Kayıt sistemi ',
  usage: 'kayıt-isim-ayarla (uye) (yas)',
  kategori: 'yetkili'
};