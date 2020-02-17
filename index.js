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
	var txt = msg.content.toUpperCase();


	if (txt == "HOLA") {
		dc.send("que tal bro");
	} else if (txt == "ERES UN BOT?") {
		dc.send("lol no");
	}


	if (txt.startsWith(pre+"ADDPLAYER")) {
		var mention = msg.mentions.users.first();
		if (mention == null) {
			dc.send("Incluye una mención válida.");
		} else {
			players.push(mention);
			dc.send("Added " + players[players.length-1]);
		}
	}
	if (txt == pre+"SHOWPLAYERS") {
		for (var i = 0; i < players.length; i++) {
			dc.send("Player: " + players[i]);
		}
	}
})


bot.login(process.env.token);