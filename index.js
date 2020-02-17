const Discord = require('discord.js');
const bot = new Discord.Client();
const pre = '-';
const token = 'Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws';
var master = "null"; //The user that serves as private console

bot.on('ready', () => {
	console.log('BOT IS ONLINE!');
	if (master != "null") {
		master.send('MASTER, BOT IS ONLINE!');
	}
})

bot.on('message', msg => {
	var dc = msg.channel; //default channel


	if (msg.content === "hola" || msg.content === "Hola") {
		dc.send('que tal bro');
	}else if (msg.content === "HOLA") {
		dc.send('no grites loko');
	}
	if (msg.content === pre+"setdefaultmaster") {
		master = msg.author;
		master.send('New master set.');
	}
})

bot.login(process.env.token);