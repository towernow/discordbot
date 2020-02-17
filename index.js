const Discord = require('discord.js');
const bot = new Discord.Client();
const pre = '-';
const token = 'Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws';

bot.on('ready', () => {
	console.log('BOT IS ONLINE!');
})

bot.on('message', msg => {
	var dc = msg.channel.id;

	if (msg.content === "hola" || msg.content === "Hola") {
		dc.send('que tal bro');
	}else if (msg.content === "HOLA") {
		dc.send('no grites loko');
	}
})

bot.login(process.env.token);