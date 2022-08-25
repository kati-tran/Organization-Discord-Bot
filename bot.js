const Discord = require('discord.js');

const client = new Discord.Client();

//const fs = require('fs')

//const auth = require('./auth.json');
//var config = require('./user_data.json')
//var userRead = fs.readFileSync(userPath);
//var userFile = JSON.parse(userRead);

//var userPath = './user_data.json'



function onReady() {

    console.log(`Logged in as ${client.user.tag}!`);
    let guild   = null;
    let channel = null;
    for ( guild   of client.guilds.values() )
    for ( channel of guild.channels.values() )
    {

        const channelName = channel.name;
        // Skip non-text channels
        if (!channel.fetchMessages) continue;
        // Max limit is 100 messages...
        channel.fetchMessages({limit: 100})
            .then(messages => {
                console.log(`Received ${messages.size} messages for #${channelName}`)
            })
            .catch(console.error);
     }

};

var blockedchannels = ['587909626087866390','563202381202849832']
var blockedcommands = ['!da', 'gif']
var saved_quotes = {};

function isPosNumeric(value) {
    return /^\d+$/.test(value);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function onReaction(react, user)

{
    const message = react.message;
    const channel = message.channel;
    const guild   = message.guild;
    // Ignore if this happened in the target channel
    // Ignore if it's not the superpin emoji
    if (react.emoji.name === '📌')
		pinMessage(guild, message, user);
    // Finally, go ahead and pin it to the channel
	    
}

function pinMessage(guild, message, user)

{
	const hall_of_fame = message.guild.channels.find(ch => ch.name === 'hall-of-fame');
    let pinMessage = [
        `**${message.author.username}**: ${message.content}`,
        `--`
    ];

    hall_of_fame.send(pinMessage)
        .then(_ => console.log(`Pinned ${user.tag}'s message: "${message.content}"`))
        .catch(console.error);
}

client.on('ready', onReady);

client.on('messageReactionAdd', onReaction);

client.on('message', msg => {

  const bot_channel = msg.guild.channels.find(ch => ch.name === 'bots');
  const link_channel = msg.guild.channels.find(ch => ch.name === 'links');
  const hall_of_fame = msg.guild.channels.find(ch => ch.name === 'hall-of-fame');
  const valid_command = msg.content.split(' ').length;
  const first_word = msg.content.split(' ')[0]

  if (msg.content.includes('http') && msg.author != client.user 
    && !msg.content.includes('!da') && !msg.content.includes('gif') 
    && !blockedchannels.includes(msg.channel.id)) {
    link_channel.send("**"+msg.author.username+"**" + " linked: " + msg.content);}

  if (first_word == '!purge' && valid_command > 1 && msg.author != client.user){
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
    if (first_word == '!quote' && msg.author != client.user){
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
        msg.delete();
      }
      else
      {
        bot_channel.send("**Please input a phrase to be saved. Example:** !quote Hello World!");
      }
    }
 
    if(msg.content === '!qs' && msg.author != client.user){
      if (!saved_quotes[msg.author.username] || saved_quotes[msg.author.username].quote == ""){
        bot_channel.send("**No saved message**");
      }
      else{
        msg.channel.send(saved_quotes[msg.author.username].quote);
        msg.delete();
      }
    }

    if(msg.content === '!kaiser' && msg.author != client.user){
    	msg.channel.send("**__Commands__** \
    	 \n\n**!kaiser**: Brings up the help menu to see available commands/usability. \
    	 \n\n**!quote**: Save a personal 'quote' to be used at any time. Requires a message to follow the command to work. Example: '!quote Hello World!' \
    	 \n\n**!qs**: Use the quote that was saved using !quote. Requires a quote to be saved before use. \
    	 \n\n**!hof**: Sends memorable quotes to a designated channel. Bypasses the Discord 50 pins rule. Example: '!hof @User [spoken quote here]' \
    	 \n\n**!math**: Do basic math between two numbers. Example: '!math 2+3' or '!math 2 + 3' \
    	 \n\n**!purge**: Deletes messages that are exactly what is inputted. Can also delete the last n(number) of messages. Example: '!purge Hello World!' or '!purge 10' \
    	 \n\n**!da**: Used before a link to prevent the link from being redirected to the designated channel. \
    	 \n\n**!8**: Has the bot reply like an 8-ball to yes or no questions from a collection of responses. \
    	 \n\n**__Functionality__** \
    	 \n\n**Pin Reactions**: When a message is reacted to with the 📌 emoji, the message is redirected to the designated channel. \
    	 \n\n**Bot Mention**: When the bot is mentioned '@Bot', it will pick a random quote from the redirected pin channel and reply with that quote. \
    	 \n\n**8-Ball**: The bot is given whatever responses to use for command !8. \
    	 \n\n**Link Redirect**: Moves all links to the designated channel for organization.")
    }

    signs = ['+','-','*','/','**']
    //var ans = 0;
    if(first_word == '!math' && valid_command > 1 && msg.author != client.user){

    	var math_part = msg.content.substr(msg.content.indexOf(" ")+1)
		console.log(math_part)
		first = ''
		second = ''
		mark = false;
		s = ''
		for(var i = 0; i < math_part.length; i++){
			if(!signs.includes(math_part[i]) && mark === false && math_part[i] != ' ')
			{
				first += math_part[i]
			}
			else if (signs.includes(math_part[i])){
				s += math_part[i]
				mark = true;
			}
			if(!signs.includes(math_part[i]) && mark === true && math_part[i] != ' ')
			{
				second += math_part[i]
			}
		}
		console.log(first)
		console.log(s)
		console.log(second)
		if(isNumeric(first) && isNumeric(second)){
			if(s === '+')
    			msg.channel.send(Number(first) + Number(second))
    		if(s === '-')
    			msg.channel.send(Number(first) - Number(second))
    		if(s === '*')
    			msg.channel.send(Number(first) * Number(second))
    		if(s === '/')
    			msg.channel.send(Number(first) / Number(second))
    		if(s === '**')
    			msg.channel.send(Number(first) ** Number(second))
		}
    }

	function getUserFromMention(mention) {
		// The id is the first and only match found by the RegEx.
		const matches = mention.match(/^<@!?(\d+)>$/);

		// If supplied variable was not a mention, matches will be null instead of an array.
		if (!matches) return;

		// However the first element in the matches array will be the entire mention, not just the ID,
		// so use index 1.
		const id = matches[1];

		return client.users.get(id);
	}

    if(first_word === '!hof' && valid_command > 2 && msg.author != client.user)
    {
    	var index = msg.content.indexOf( ' ', msg.content.indexOf( ' ' ) + 1 );
    	const user = getUserFromMention(msg.content.split(' ')[1]);
    	if(!user){
    		bot_channel.send("Please provide a valid citation. Example: '!hof @User quote quote quote' ")
    	}
    	else{
    		hall_of_fame.send("**" + user.username + "**: " + msg.content.substr(index + 1) + '\n--');		
    	}

    }

    if (msg.isMentioned(client.user)){
	  	hall_of_fame.fetchMessages({limit: 100})
	  		.then(collected =>{
	  			const boi = `${collected.random(1)}`
	  			rusername = 0;
	  			for(var i = 0; i < boi.length; i++)
	  			{
	  				if(boi[i] === ':' && boi[i+1] == " "){
	  					rusername = i+2;
	  					break;
	  				}
	  				else if (boi[i] === ':' && boi[i+1] == "*"){
	  					rusername = i+4;
	  					break;
	  				}
	  			}

	  			if(msg.isMentioned(client.user)){
	  				msg.delete();
	  			}

	  			console.log(rusername)
	  			if(boi[boi.length-1] === '-')
	  			{
		  			var newStr = boi.substring(rusername,boi.length-2)
		  			msg.channel.send(newStr)
	  			}
	  			else
	  			{
	  				var newStr = boi.substring(rusername,boi.length)
	  				msg.channel.send(newStr)
	  			}
	  			console.log(newStr)
	  	  	})
			.catch(err => console.log(err))
    }

    if(first_word === '!8' && msg.author != client.user){
    	if(valid_command === 1){
    		msg.delete();
    	}
    	msg.guild.channels.find(ch => ch.name === '8-ball').fetchMessages({limit: 100})
    		.then(collected =>{
    			const choice = `${collected.random(1)}`
    			msg.channel.send(choice)
    		})
    		.catch(err => console.log(err))
    }


});


//client.login(auth.token);
client.login(process.env.BOT_TOKEN);


//heroku sleep prevention
var http = require("http");
setInterval(function() {
    http.get("http://covenantdiscordlinkbot.herokuapp.com");
}, 300000); // every 5 minutes (300000)
