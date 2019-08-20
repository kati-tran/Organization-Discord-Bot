const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs')

//const auth = require('./auth.json');
<<<<<<< HEAD
<<<<<<< HEAD
//var config = require('./user_data.json')
//var userRead = fs.readFileSync(userPath);
//var userFile = JSON.parse(userRead);

const SQLite = require("better-sqlite3");
const sql = new SQLite('./quote.sqlite');
=======
var userPath = './user_data.json'
var userRead = fs.readFileSync(userPath);
var userFile = JSON.parse(userRead);
>>>>>>> parent of 9ee63ba... oh boy
=======
var userPath = './user_data.json'
var userRead = fs.readFileSync(userPath);
var userFile = JSON.parse(userRead);
>>>>>>> parent of 9ee63ba... oh boy


client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

var blockedchannels = ['587909626087866390','563202381202849832']
var blockedcommands = ['!da', 'gif']
//var saved_quotes = {};

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
<<<<<<< HEAD
<<<<<<< HEAD
        quotes = client.getQuote.get(msg.author.id);
        if(!quotes){
          quotes = {id: '&{msg.author.id}', user: msg.author.id, phrase: msg.content.substr(msg.content.indexOf(" ")+1)}         
        }
        quotes.phrase = msg.content.substr(msg.content.indexOf(" ")+1)
  			//fs.writeFileSync(userPath, JSON.stringify(userFile, null, 2));
        bot_channel.send("**"+msg.author.username + " saved message:** " + quotes.phrase);
  		  client.setQuote.run(quotes);
      }
=======
=======
>>>>>>> parent of 9ee63ba... oh boy
  			userFile[msg.author.username] = {quote: msg.content.substr(msg.content.indexOf(" ")+1)};
  			fs.writeFileSync(userPath, JSON.stringify(userFile, null, 2));
        bot_channel.send("**"+msg.author.username + " saved message:** " + userFile[msg.author.username].quote);
  		}
<<<<<<< HEAD
>>>>>>> parent of 9ee63ba... oh boy
=======
>>>>>>> parent of 9ee63ba... oh boy
  		else
  		{
  			bot_channel.send("**Please input a phrase to be saved. Example:** !quote Hello World!");
  		}
  	}

    if(msg.content === '!qs'){
<<<<<<< HEAD
<<<<<<< HEAD
      if (!quotes || quotes.phrase == ""){
        bot_channel.send("**No saved message**");
      }
      else{
        msg.channel.send(quotes.phrase);
=======
=======
>>>>>>> parent of 9ee63ba... oh boy
      if (!userFile[msg.author.username] || userFile[msg.author.username].quote == ""){
        bot_channel.send("**No saved message**");
      }
      else{
        msg.channel.send(userFile[msg.author.username].quote);
<<<<<<< HEAD
>>>>>>> parent of 9ee63ba... oh boy
=======
>>>>>>> parent of 9ee63ba... oh boy
        msg.delete();
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
