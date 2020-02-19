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
		dc.send("te traigo pañuelos tio?");
	}
	else if ((" " + txt + " ").indexOf(" TU ") != -1 || (" " + txt + " ").indexOf(" TU, ") != -1 || (" " + txt + " ").indexOf(" ,TU ") != -1) {
		dc.send("te estas jugando un baneo loko..");
		disconectPlayer(msg.author);
	}


	let args = txt.substring(pre.length).split(" ");
	switch (args[0]) {

		case "IMMASTER":
			master = msg.author;
			msg.author.send("You are now master.");
		break;

		case "ADDPLAYER":
			if (!startedGame) {
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

					var embd = new Discord.RichEmbed()
						.setColor("#ffff00")
						.setTitle("JUGONES BATTLE ROYALE")
						.setDescription("Added player" + players[players.length - 1])
					dc.send(embd);
				}
			}
		break;

		case "ADDWEAPON":
			if (msg.author == master) {
				weapons.push(msg.content.substring(msg.content.indexOf(" ") - 1));

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("JUGONES BATTLE ROYALE")
					.setDescription("Added weapon " + weapons[weapons.length - 1][0] + " with level " + weapons[weapons.length - 1][1]);
				dc.send(embd);
			}
		break;

		case "SHOW":
			var text = "";
			for (var i = 0; i < players.length; i++) {
				var wea = players[i].weapon;
				var obj = players[i].object;
				var all = players[i].ally;
				var ded = players[i].dead;
				text += i + " " + players[i] + "\n";
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

function disconectPlayer(vcUser) {
	let randomnumber = Math.floor(Math.random() * 9000 + 1000);

	receivedMessage.guild.createChannel(`voice-kick-${randomnumber}`, "voice");
	vcUser.setVoiceChannel(receivedMessage.guild.channels.find(r => r.name === `voice-kick-${randomnumber}`));
	receivedMessage.guild.channels.find(r => r.name === `voice-${randomnumber}`).delete();
}

bot.login(process.env.token);