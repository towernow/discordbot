const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws";
const pre = "-";

bot.on("ready", () => {
	console.log("BOT IS ONLINE!");
})

/////////////////////////////////////////////////////////////////////////////////////

var players = [];
var weapons =  [["Pipsa", "1 ha asesinado a 2 sin ningun tipo de piedad", 10],
				["Bandicoondon", "1 ha asesinado a 2 sin ningun tipo de piedad", 5]];


bot.on("message", msg => {
	var dc = msg.channel; //default channel
	var txt = msg.content.toUpperCase();


	if (txt == "HOLA") {
		dc.send("que tal bro");
	}
	else if (txt == "ERES UN BOT?") {
		dc.send("lol no");
	}


	if (txt.startsWith(pre + "HELP")) {
		dc.send("-add @UserMention     Para añadir un jugador al Battle Royale\n" +
				"-show     Para mostrar todos los jugadores del Battle Royale y sus stats\n");
	}

	if (txt.startsWith(pre+"ADD")) {
		var mention = msg.mentions.users.first();
		if (mention == null) {
			dc.send("Incluye una mención válida.");
		} else {
			players.push(mention);
			players[players.length - 1].weapon = "escoba";
			dc.send("Added " + players[players.length - 1]);
			dc.send("Weapon " + players[players.length - 1].weapon);
		}
	}

	if (txt.startsWith(pre + "SHOW")) {
		var text = "";
		for (var i = 0; i < players.length; i++) {
			text += i+":" + players[i] + "\n";
		}

		var embd = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setTitle('JUGONES BATTLE ROYALE')
			.setDescription(text + "\n"+weapons[1][0])
			.setFooter("Quedan "+" jugadores restantes.");
		dc.send(embd);
	}
})


bot.login(process.env.token);