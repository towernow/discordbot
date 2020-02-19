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
					players[players.length - 1].weapon = 0;//
					players[players.length - 1].object = 0;//
					players[players.length - 1].ally = 3;//
					players[players.length - 1].dead = false;//
				}

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("JUGONES BATTLE ROYALE")
					.setDescription("Added player " + players[players.length - 1])
				dc.send(embd);
			}
		break;

		case "ADDWEAPON":
			if (msg.author == master && args[1] != null && args[2] != null) {
				weapons.push([args[1], args[2]]);

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("JUGONES BATTLE ROYALE")
					.setDescription("Added weapon " + weapons[weapons.length - 1][0] + " with level " + weapons[weapons.length - 1][1]);
				dc.send(embd);
			}
		break;
		case "ADDOBJECT":
			if (msg.author == master && args[1] != null && args[2] != null) {
				object.push([args[1], args[2]]);

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("JUGONES BATTLE ROYALE")
					.setDescription("Added object " + objects[objects.length - 1][0] + " with level " + objects[objects.length - 1][1]);
				dc.send(embd);
			}
		break;

		case "SHOWITEMS":
			
			
			var embd = new Discord.RichEmbed()
				.setColor("#ffff00")
				.setTitle("JUGONES BATTLE ROYALE")
				.setDescription("Added object " + objects[objects.length - 1][0] + " with level " + objects[objects.length - 1][1]);
			dc.send(embd);
		break;

		case "SHOW":
			var text = "";
			for (var i = 0; i < players.length; i++) {
				var wea = players[i].weapon;
				var obj = players[i].object;
				var all = players[i].ally;
				var ded = players[i].dead;
				text += i + " " + players[i] + "⚔️👜💑" + "\n";
			}

			var embd = new Discord.RichEmbed()
				.setColor("#ffff00")
				.setTitle("JUGONES BATTLE ROYALE")
				.setDescription(text)
				.setFooter("Quedan " + " jugadores restantes");
			dc.send(embd);
		break;

	}
})

function nextTurn() {
	
}

bot.login(process.env.token);