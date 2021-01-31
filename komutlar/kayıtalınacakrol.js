const Discord = require('discord.js');
const db = require('quick.db');
const kobscode = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || kobscode.prefix;
  let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]);
  if(!rol) return message.reply('Kayıt işlemi gerçekleştirilirken üyeden alınacak rolü belirtmelisin!')
  await db.set(`kayitalinacakrol_${message.guild.id}`, rol.id)
  message.reply(`Kayıt işleminde alınacak rol başarıyla \`${rol.name}\` olarak ayarlandı!`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit-alinacak-rol'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-alınacak-rol',
  description: 'Kayıt işleminde alınacak rolü ayarlama - Kayıt sistemi ',
  usage: 'kayıt-alınacak-rol @rol/rolID',
  kategori: 'yetkili'
};