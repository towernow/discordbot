const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws";
const pre = "-";
var master, startedGame = false;

bot.on("ready", () => {
	console.log("BOT IS ONLINE!");
})

/////////////////////////////////////////////////////////////////////////////////////

var players = [];
var weapons = [
	["Pipsa", 10],
	["Bandicoondon", 5]
];
var object = [
	["Escudo", 5],
	["T", 5]
];


bot.on("message", msg => {
	var dc = msg.channel; //default channel
	var txt = msg.content.toUpperCase();


	if (txt.indexOf("HOLA") != -1) {
		dc.send("que tal bro");
	}
	else if (txt.indexOf("ERES UN BOT?") != -1) {
		dc.send("lol no");
	}
	else if (txt.indexOf("JAJA") != -1) {
		dc.send("jajaja");
	}
	else if (txt.indexOf("LOL") != -1) {
		dc.send("tu, vendete ya la cuenta va");
	}


	if (txt.startsWith(pre + "HELP")) {
		dc.send("-add @User     To add a player\n" +
				"-show     To show the Battle Royale current state\n");
	}

	if (txt.startsWith(pre + "IMMASTER")) {
		master = msg.author;
		msg.author.send("You are now master.")
	}

	if (txt.startsWith(pre+"ADD")) {
		var mention = msg.mentions.users.first();
		if (mention == null) {
			players.push(msg.content.substring(msg.content.indexOf("@")));
			dc.send("Added a non-discord player");
		} else {
			players.push(mention);
			players[players.length - 1].weapon = 0;//
			players[players.length - 1].object = 0;//
			players[players.length - 1].ally = 3;//
			players[players.length - 1].dead = false;//
			dc.send("Added " + players[players.length - 1]);
		}
	}

	if (txt.startsWith(pre + "SHOW")) {
		var text = "";
		for (var i = 0; i < players.length; i++) {
			text += i+":" + players[i] + "\n";
		}

		var embd = new Discord.RichEmbed()
			.setColor("#ffff00")
			.setTitle("JUGONES BATTLE ROYALE")
			.setDescription(text + "\n")
			.setFooter("Quedan "+" jugadores restantes.");
		dc.send(embd);
	}
})


bot.login(process.env.token);