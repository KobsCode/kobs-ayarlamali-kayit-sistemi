const Discord = require('discord.js');
const db = require('quick.db');
const kobscode = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || kobscode.prefix;
  let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]);
  if(!rol) return message.reply('Kayıt işlemi gerçekleştirilirken üyeye verilecek rolü belirtmelisin!')
  await db.set(`kayitverilecekrol_${message.guild.id}`, rol.id)
  message.reply(`Kayıt işleminde verilecek rol başarıyla \`${rol.name}\` olarak ayarlandı!`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit-verilecek-rol'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-verilecek-rol',
  description: 'Kayıt işleminde verilecek rolü ayarlama - Kayıt sistemi ',
  usage: 'kayıt-verilecek-rol @rol/rolID',
  kategori: 'yetkili'
};