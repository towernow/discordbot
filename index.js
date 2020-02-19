const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws";
const pre = "-";
var master, dc, startedGame = false;

bot.on("ready", () => {
	console.log("BOT IS ONLINE!");
})

/////////////////////////////////////////////////////////////////////////////////////

var players = [];
var weapons = [
	["Pipsa", 10],
	["Bandicoondon", 5]
];


bot.on("message", msg => {
	dc = msg.channel; //default channel
	var txt = msg.content.toUpperCase();

	if (msg.author.bot)
		return;

	if (txt.indexOf("HOLA") != -1) {
		dc.send("que tal bro");
	}
	else if (txt.indexOf("PUTO") != -1 || txt.indexOf("PUTA") != -1 || txt.indexOf("POLLA") != -1) {
		dc.send("eeeeh");
	}
	else if (txt.indexOf("ERES UN BOT?") != -1) {
		dc.send("lol no");
	}
	else if (txt.indexOf("JAJAJA") != -1) {
		dc.send("jajaj");
	}
	else if (txt.indexOf("LOL") != -1) {
		dc.send("tu, vendete ya la cuenta va");
	}
	else if (txt.indexOf("GILIPOLLAS") != -1 || txt.indexOf("IMBECIL") != -1) {
		dc.send("tu madre");
	}
	else if (txt.indexOf("LLOR") != -1) {
		dc.send("te traigo uns mocadors o que tio?");
	}
	else if ((" " + txt + " ").indexOf(" TU ") != -1 || (" " + txt + " ").indexOf(" TU, ") != -1 || (" " + txt + " ").indexOf(" ,TU ") != -1) {
		dc.send("te estas jugando un baneo loko..");
	}


	let args = msg.content.substring(pre.length).split(" ");
	switch (args[0].toUpperCase()) {

		case "IMMASTER":
			master = msg.author;
			msg.author.send("You are now master.");
		break;
		
		case "ADDPLAYER":
			if (!startedGame && args[1] != null) {
				var mention = msg.mentions.users.first();
				if (mention == null) {
					players.push(args[1]);
				} else {
					players.push(mention);
				}

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("Added player " + players[players.length - 1])
				dc.send(embd);
			}
		break;

		case "ADDWEAPON":
			if (msg.author == master && args[1] != null && args[2] != null) {
				weapons.push([args[1], args[2]]);

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("Added weapon " + weapons[weapons.length - 1][0] + " with power " + weapons[weapons.length - 1][1]);
				dc.send(embd);
			}
		break;

		case "START":
			if (msg.author == master) {
				startedGame = true;
				nextTurn(60*1000); //Time ms

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("¡DA COMIENZO EL JUGONES BATTLE ROYALE!");
				dc.send(embd);
			}
		break;

		case "SHOWWEAPONS":
			var text = "";
			for (var i = 0; i < weapons.length; i++) {
				text += weapons[i][0].toUpperCase() + " with power " + weapons[i][1] + "\n";
			}

			var embd = new Discord.RichEmbed()
				.setColor("#ffff00")
				.setTitle("🌟JUGONES BATTLE ROYALE🌟")
				.setDescription(text)
			dc.send(embd);
		break;

		case "SHOW":
			var text = returnStats();

			var jgRestantes = 0;
			for (var i = 0; i < players.length; i++) {
				if (players[i].dead)
					jgRestantes++;
			}

			var embd = new Discord.RichEmbed()
				.setColor("#ffff00")
				.setTitle("🌟JUGONES BATTLE ROYALE🌟")
				.setDescription(text)
				.setFooter("Quedan " + jgRestantes + " jugadores restantes");
			dc.send(embd);
		break;

	}
})

function nextTurn(everySeconds) {
	dc.send(returnStats());

	setTimeout(function () { nextTurn(everySeconds); }, everySeconds);
}

function returnStats() {
	var txt = "";
	for (var i = 0; i < players.length; i++) {
		txt += (players[i].dead ? "💀 " : "⭐ ") + players[i] + " :     ⚔️" + players[i].weapon1 + " ⚔️" + players[i].weapon2 + " 💑" + players[i].ally + "\n";
	}

	return txt;
} 

bot.login(process.env.token);