const Discord = require('discord.js');

const client = new Discord.Client();

//const auth = require('./auth.json');



client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});


client.on('message', msg => {

  if (msg.content.includes('http') && msg.author != client.user && !msg.content.includes('!da')) {
    client.channels.get('563202381202849832').send(msg.author + " linked: " + msg.content);

  }

});


//client.login(auth.token);
client.login(process.env.BOT_TOKEN);
