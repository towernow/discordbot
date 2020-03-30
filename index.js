const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const token = "Njc2MTI0Mzk1Nzg1NDIwODAx.XoJSJg.qOUbcEmlGO0S9HVEa1XpYinFSs0";

/////////////////////////////////////////////////////////////////////////////////////
//https://discordapp.com/oauth2/authorize?client_id=676124395785420801&scope=bot&permissions=1341652289
/////////////////////////////////////////////////////////////////////////////////////


var dc;

bot.msgs = require("./msgs.json");

bot.on("ready", () => {
	console.log("BOT IS ONLINE!");
	bot.user.setActivity("Jugando al vacile bro");
})

bot.on("message", msg => {
	if(dc == null){
		dc = msg.channel; //default channel
	}
	var txt = msg.content.toUpperCase();

	if (msg.author.bot)
		return;

	if (txt.indexOf("HOLA") != -1) {
		msg.channel.send("que tal bro");
	}
	else if (txt.indexOf("GILIPOLLAS") != -1 || txt.indexOf("IMBECIL") != -1 || txt.indexOf("SUBNORMAL") != -1 || txt.indexOf("RETRASADO") != -1) {
		msg.channel.send("tu madre");
	}
	else if (txt.indexOf("NEPIS") != -1 || txt.indexOf("NOPOR") != -1 || txt.indexOf("ÑOCO") != -1) {
		msg.channel.send("habla bien gilipollas");
	}
	else if (txt.indexOf("PUTO") != -1 || txt.indexOf("PUTA") != -1 || txt.indexOf("POLLA") != -1) {
		msg.channel.send("eeeeh");
	}
	else if (txt.indexOf("ERES UN BOT?") != -1) {
		msg.channel.send("lol no");
	}
	else if (txt.indexOf("JAJAJA") != -1) {
		msg.channel.send("jajaj");
	}
	else if (txt.indexOf("LOL") != -1) {
		msg.channel.send("tu, vendete ya la cuenta va");
	}
	else if (txt.indexOf("LLOR") != -1) {
		msg.channel.send("te traigo uns mocadors o que tio?");
	}
	else if (txt.indexOf("CALLA") != -1) {
		msg.channel.send("tu, xapala va");
	}
	else if (txt.indexOf("PUTO AMO") != -1) {
		msg.channel.send("nice cock bro");
	}
	else if (txt.indexOf("PIPO") != -1) {
		msg.channel.send("es un buen perro");
	}
	else if (txt.indexOf("COCK") != -1) {
		msg.channel.send("that's a chicken motherfucker");
	}
	else if (txt.indexOf("PEÑALVA") != -1) {
		msg.channel.send("sniff sniff");
	}
	else if ((" " + txt + " ").indexOf(" BRO ") != -1 || (" " + txt + " ").indexOf(" BRO, ") != -1 || (" " + txt + " ").indexOf(" ,BRO ") != -1) {
		msg.channel.send("bro...");
	}
	else if ((" " + txt + " ").indexOf(" BOT ") != -1 || (" " + txt + " ").indexOf(" BOT, ") != -1 || (" " + txt + " ").indexOf(" ,BOT ") != -1) {
		msg.channel.send("bot quién?");
	}
	else if ((" " + txt + " ").indexOf(" TU ") != -1 || (" " + txt + " ").indexOf(" TU, ") != -1 || (" " + txt + " ").indexOf(" ,TU ") != -1) {
		msg.channel.send("te estas jugando un baneo loko..");
	}
})

//RELOAD TOKEN IN DEVELOPERS DISCORD EVERY TIME IS CHANGED
bot.login(process.env.token); //Heroku
//bot.login(token); //Local (node .)
