const chalk = require('chalk')
const moment = require('moment')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

var prefix= ayarlar.prefix;

module.exports = client => {
  console.log(`➢Kobs artık aktif!`);
  console.log(`➢komutlar yüklendi!`);
  console.log(`《Bot yapımcısı: ( OgünSert | Kobs#2738)》`);
  client.user.setStatus("online");
  //idle = boşta
  //dnd = rahatsız etmeyin
  //online = çevrimiçi
    var oyun = [
        "Kobs "  + client.guilds.size +   " sunucuya ve "  + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() +   "  kullanıcıya hizmet veriyor!",
        "Bot bakımdadır!",
        "Youtube.Com/OgünSertKobs",
        "Kanala Abone Olmayı Unutma",
        "!kayıtsistemi | Türkiyenin en iyisi olmaya geliyoruz!"
    ];
  
    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setGame(oyun[random], );
        }, 2 * 9000);
  
};
