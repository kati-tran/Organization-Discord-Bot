const Discord = require('discord.js');

const client = new Discord.Client();

const auth = require('./auth.json');



client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});


client.on('message', msg => {

  if (msg.content.includes('https:') && msg.author != client.user) {
    client.channels.get('563202381202849832').send(msg.content);

  }

});


client.login(auth.token);