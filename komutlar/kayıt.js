const Discord = require('discord.js');
const db = require('quick.db');
const kobscode = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || kobscode.prefix;
  let kayitkanali = await db.fetch(`kayitkanali_${message.guild.id}`);
  let kayitlogkanali = await db.fetch(`kayitlogkanali_${message.guild.id}`);
  let kayitisimsekli = await db.fetch(`kayitisimsekli_${message.guild.id}`);
  let kayitalinacakrol = await db.fetch(`kayitalinacakrol_${message.guild.id}`);
  let kayitverilecekrol = await db.fetch(`kayitverilecekrol_${message.guild.id}`);
  let kayithosgeldinmesaji = await db.fetch(`kayithosgeldinmesaji_${message.guild.id}`);
  let kayitisimtemizleyici = await db.fetch(`kayitisimtemizleyici_${message.guild.id}`);

  const alfabe = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'ğ', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y', 'z', 'q', 'w', 'x'];

  if(message.channel.id !== kayitkanali) return
  if(kayitisimsekli && kayitisimsekli.includes('(yas)')) {
    if(!args[0] || !args[1]) return message.reply(`İsim ve yaşını belirtmelisin! \`Örn:\` ${prefix}kayıt Ogün 19`);
    if(kayitisimtemizleyici && (args[0]).split("").some(karakter => alfabe.some(harf => karakter.toLowerCase() !== harf.toLowerCase()))) return message.reply('İsminde alfabe dışı karakter bulunduramazsın!');
    try {
      await message.member.setNickname(kayitisimsekli.replace('(uye)', args[0]).replace('(yas)', args[1]));
      if(message.guild.roles.has(kayitverilecekrol)) { await message.member.addRole(kayitverilecekrol) };
      if(message.guild.roles.get(kayitalinacakrol)) { await message.member.removeRole(kayitalinacakrol) };
      if(client.channels.has(kayitlogkanali)) { await client.channels.get(kayitlogkanali).send(new Discord.RichEmbed().setAuthor(client.user.username + " Kayıt Sistemi", client.user.avatarURL).setDescription(`Yeni bir üye kayıt oldu! \n**Üye:** ${message.author} \n**Üyeden Alınan Rol:** ${message.guild.roles.get(kayitalinacakrol)} \n**Üyeye Verilen Rol:** ${message.guild.roles.get(kayitverilecekrol)}`).setFooter(message.guild.name, message.guild.iconURL).setTimestamp()) };
    } catch(err) { }
  }
  if(kayitisimsekli && !kayitisimsekli.includes('(yas)')) {
    if(!args[0]) return message.reply(`İsim belirtmelisin! \`Örn:\` ${prefix}kayıt Ogün`);
    if(kayitisimtemizleyici && (args[0]).split("").some(karakter => alfabe.some(harf => karakter.toLowerCase() !== harf.toLowerCase()))) return message.reply('İsminde alfabe dışı karakter bulunduramazsın!');
    try {
      await message.member.setNickname(kayitisimsekli.replace('(uye)', args[0]));
      if(message.guild.roles.has(kayitverilecekrol)) { await message.member.addRole(kayitverilecekrol) };
      if(message.guild.roles.get(kayitalinacakrol)) { await message.member.removeRole(kayitalinacakrol) };
      if(client.channels.has(kayitlogkanali)) { await client.channels.get(kayitlogkanali).send(new Discord.RichEmbed().setAuthor(client.user.username + " Kayıt Sistemi", client.user.avatarURL).setDescription(`Yeni bir üye kayıt oldu! \n**Üye:** ${message.author} \n**Üyeden Alınan Rol:** ${message.guild.roles.get(kayitalinacakrol)} \n**Üyeye Verilen Rol:** ${message.guild.roles.get(kayitverilecekrol)}`).setFooter(message.guild.name, message.guild.iconURL).setTimestamp()) };
    } catch(err) { }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayit'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt',
  description: 'Kayıt sistemi',
  usage: 'kayıt',
  kategori: 'kullanıcı'
};