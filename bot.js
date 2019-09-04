const Discord = require('discord.js');

const client = new Discord.Client();

//const fs = require('fs')

//const auth = require('./auth.json');
//var config = require('./user_data.json')
//var userRead = fs.readFileSync(userPath);
//var userFile = JSON.parse(userRead);

//var userPath = './user_data.json'



client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

var blockedchannels = ['587909626087866390','563202381202849832']
var blockedcommands = ['!da', 'gif']
var saved_quotes = {};

function isPosNumeric(value) {
    return /^\d+$/.test(value);
}

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

client.on('message', msg => {

  const bot_channel = msg.guild.channels.find(ch => ch.name === 'bots');
  const valid_command = msg.content.split(' ').length;
  const first_word = msg.content.split(' ')[0]

  if (msg.content.includes('http') && msg.author != client.user 
    && !msg.content.includes('!da') && !msg.content.includes('gif') 
    && !blockedchannels.includes(msg.channel.id)) {
    bot_channel.send("**"+msg.author.username+"**" + " linked: " + msg.content);}

  if (first_word == '!purge' && valid_command > 1){
  	var delete_message = msg.content.substr(msg.content.indexOf(" ")+1)
  	//if(!channel) return;
  	if (isPosNumeric(delete_message)){
  		delete_number = parseInt(delete_message,10) + 1;
  		console.log("Numeric Purge Working. Number is " + delete_message);
  		console.log(delete_number);
	  	msg.channel.fetchMessages({limit: delete_number})
	  		.then(collected =>{
		  		collected.forEach(mesg => {
		  			mesg.delete();
	  			})
	  	  	})
			.catch(err => console.log(err))
  	}
  	else{
	  	console.log("Purge Working")
	  	msg.channel.fetchMessages({limit: 50})
	  		.then(collected =>{
		  		collected.forEach(mesg => {
		  			if (mesg.content === delete_message) 
		  				mesg.delete();
		  		})
		  	})
		  	.catch(err => console.log(err))
  	}
	bot_channel.send("**Deleted **"+ delete_message)
  }
 //  	var userRead = fs.readFileSync(userPath);
	// var userFile = JSON.parse(userRead);
    if (first_word == '!quote'){
      if (valid_command > 1){

    	saved_quotes[msg.author.username] = {quote: msg.content.substr(msg.content.indexOf(" ")+1)}
        //userFile[msg.author.username] = {quote: msg.content.substr(msg.content.indexOf(" ")+1)};
        //console.log(userFile[msg.author.username]);
        // fs.writeFileSync(userPath, JSON.stringify(userFile, null, 2));
        // fs.writeFile(userPath, JSON.stringify(userFile), 'utf8', function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }

        //     console.log("The file was saved!");
        // }); 
       
        bot_channel.send("**"+msg.author.username + " saved message:** " + saved_quotes[msg.author.username].quote);
      }
      else
      {
        bot_channel.send("**Please input a phrase to be saved. Example:** !quote Hello World!");
      }
    }
 
    if(msg.content === '!qs'){
      if (!saved_quotes[msg.author.username] || saved_quotes[msg.author.username].quote == ""){
        bot_channel.send("**No saved message**");
      }
      else{
        msg.channel.send(saved_quotes[msg.author.username].quote);
        msg.delete();
      }
    }

    if(msg.content === '!covenant'){
    	msg.channel.send("**__Commands__** \n\n**!covenant**: Brings up the help menu to see available commands/usability. \n\n**!quote**: Save a personal 'quote' to be used at any time. Requires a message to follow the command to work. Example: '!quote Hello World!' \
    	 \n\n**!qs**: Use the quote that was saved using !quote. Requires a quote to be saved before use. \n\n**!purge** Deletes messages that are exactly what is inputted. Can also delete the last n(number) of messages. Example: '!purge Hello World!' or '!purge 10' \
    	 \n\n**!da**: Used before a link to prevent the link from being redirected to the designated channel. \n\n**__Functionality__** \n\n**Link Redirect**: Moves all links to the designated channel for organization.")
    }

    if(first_word == '!math' && valid_command > 1){

    	var math_part = msg.content.substr(msg.content.indexOf(" ")+1)
    	if (valid_command > 2){
    		m = math_part.split(' ').length;
    		console.log(m)
    		if(m.length === 3){
	    		if(isNumeric(m[0]) && isNumeric(m[2])){
	    			if(m[1] === '+')
		    			msg.channel.send(parseInt(m[0],10) + parseInt(m[2],10))
	    		}
    		}
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
