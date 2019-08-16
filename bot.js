const Discord = require('discord.js');

const client = new Discord.Client();

//const auth = require('./auth.json');



client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

var blockedchannels = ['587909626087866390','563202381202849832']
var blockedcommands = ['!da', 'gif']
var saved_quotes = {};

client.on('message', msg => {

  const bot_channel = msg.guild.channels.find(ch => ch.name === 'bots');
  const valid_command = msg.content.split(' ').length;
  const first_word = msg.content.split(' ')[0]

  if (msg.content.includes('http') && msg.author != client.user 
    && !msg.content.includes('!da') && !msg.content.includes('gif') 
    && !blockedchannels.includes(msg.channel.id)) {
    client.channels.get('563202381202849832').send("**"+msg.author.username+"**" + " linked: " + msg.content);}

  if (first_word == '!purge' && valid_command > 1){
  	var delete_message = msg.content.substr(msg.content.indexOf(" ")+1)
  	//if(!channel) return;
  	bot_channel.send("**Cleaning up messages:** " + delete_message);
  	msg.channel.fetchMessages({limit: 10}).then(collected =>{
  		collected.each(mesg => {
  			if (mesg.content === delete_message) mesg.delete();
  		})
  	  })
  	}

  	if (first_word == '!quote'){
  		if (valid_command > 1){
  			saved_quotes[msg.author.username] = msg.content.substr(msg.content.indexOf(" ")+1);
  			bot_channel.send("**"+msg.author.username+"**" + "** saved message:** " + saved_quotes[msg.author.username]);
  		}
  		else
  		{
  			bot_channel.send("**Please input a phrase to be saved. Example:** !quote Hello World!");
  		}


  	}

  	if(msg.content === '!qs'){
  		if (msg.author.username in saved_quotes){
  			msg.channel.send(saved_quotes[msg.author.username]);
  		}
  		else{
  			bot_channel.send("**No saved message**");
  		}
  	}

});


//client.login(auth.token);
client.login(process.env.BOT_TOKEN);


//heroku sleep prevention
var http = require("http");
setInterval(function() {
    http.get("http://covenantdiscordlinkbot.herokuapp.com");
}, 300000); // every 5 minutes (300000)
