const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws';

bot.on('ready', () => {
	console.log('BOT IS UP!');
})

bot.on('message', msg => {
	if (msg.content === "hola" || msg.content === "Hola") {
		msg.reply('hola que tal bro');
	}else if (msg.content === "HOLA") {
		msg.reply('no grites loko');
	}
})

bot.login(process.env.token);