const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws";
const pre = "-";

bot.on("ready", () => {
	console.log("BOT IS ONLINE!");
	
})

/////////////////////////////////////////////////////////////////////////////////////

var players = [];


bot.on("message", msg => {
	var dc = msg.channel; //default channel

	if (msg.content == "hola" || msg.content == "Hola") {
		dc.send("que tal bro");
	} else if (msg.content == "HOLA") {
		dc.send("no grites loko");
	} else if (msg.content.toUpperCase() == "ERES UN BOT?") {
		dc.send("lol no");
	}


	if (msg.content == pre+"addPlayer") {
		var mention = msg.mentions.users.first();
		if (mention != null) {
			players.push(mention);
		} else {
			dc.send("Incluye una mención válida.");
		}
		dc.send("Added <@$" + mention.id + ">");
	}
	if (msg.content == pre + "showplayers") {
		for (var i = 0; i < playerIDs.length; i++) {
			dc.send("Player: <@$" + players[i] + ">");
		}
	}
})


bot.login(process.env.token);