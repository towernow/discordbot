﻿const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws";
const pre = "-", everyMSeconds = 5*1000; //Time ms (86400*1000)/3(un dia);
var master, dc, startedGame = false, turnoN = 0, intervalMain;

bot.on("ready", () => {
	console.log("BOT IS ONLINE!");
})

/////////////////////////////////////////////////////////////////////////////////////

var players = [];
var weapons = [
	["Puños", 0],
	["Bandicoondon", 10],
	["Penis", 7],
	["Vagina", 5],
	["T pose", 9]
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
			if (msg.author == master && !startedGame && args[1] != null) {
				var mention = msg.mentions.users.first();
				if (mention == null) {
					players.push(args[1]);
				} else {
					players.push(mention);
				}

				players[players.length - 1].dead = false;
				players[players.length - 1].weapon1 = 0;
				players[players.length - 1].weapon2 = 0;

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("Added player " + players[players.length - 1])
				dc.send(embd);
			}
		break;

		case "REMOVEPLAYER":
			if (msg.author == master && !startedGame && args[1] != null) {
				var idx = args[1];

				if (idx > -1) {
					players.splice(idx, 1);
				}

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("Removed player " + idx)
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
				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("¡DA COMIENZO EL JUGONES BATTLE ROYALE!");
				dc.send(embd);

				if (!startedGame) {
					intervalMain = setInterval(nextTurn, everyMSeconds);
					startedGame = true;
				}
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
			var text = "";

			for (var i = 0; i < players.length; i++) {
				text += returnStats(i) + "\n";
			}

			var jgRestantes = 0;
			for (var i = 0; i < players.length; i++) {
				if (!players[i].dead)
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

function nextTurn() {
	var txt = "";
	var p1 = Math.floor(Math.random() * players.length);
	console.log(p1);//debug

	var embd = new Discord.RichEmbed();
	embd.setTitle("🌟JUGONES BATTLE ROYALE🌟")

	if (turnoN % 3 == 0)
		txt += "AMANECER";
	else if (turnoN % 3 == 1)
		txt += "TARDE";
	else if (turnoN % 3 == 2)
		txt += "MEDIANOCHE";
	txt += " DEL DÍA " + Math.floor(turnoN / 3) + "\n--------------------------------------\n\n";

	var rndMove = Math.floor(Math.random() * 2);
	if (rndMove == 0) { //WEAPON//////////////////////////////////////////////////////////////////////////
		var weap = Math.floor(Math.random() * (weapons.length - 1)) + 1;

		txt += players[p1] + "\n ha encontrado **" + weapons[weap][0] + "**";

		if (players[p1].weapon1 == 0) {
			players[p1].weapon1 = weap;
		} else if (players[p1].weapon2 == 0) {
			players[p1].weapon2 = weap;
		} else {
			if (weapons[players[p1].weapon1][1] < weapons[players[p1].weapon2][1]) { //Si el poder del arma 1 es menor que el de arma 2
				txt += " y ha lanzado **" + weapons[players[p1].weapon1][0] + "**";
				players[p1].weapon1 = weap;
			} else {
				txt += " y ha lanzado **" + weapons[players[p1].weapon2][0] + "**";
				players[p1].weapon2 = weap;
			}
		}

		embd.setColor("#0000ff");
	}
	else if (rndMove == 1) { //ALLY//////////////////////////////////////////////////////////////////////////
		var p2;
		do {
			p2 = Math.floor(Math.random * players.length);
		} while (p1 == p2);

		if (players[p1].ally == p2) { //Si coincide nuevo aliado con actual aliado -> abandono
			players[p1].ally = null;
			players[p2].ally = null;
			txt += players[p1] + " ha abandonado a " + players[p2];
		} else if (players[p1].ally == null && players[p2].ally == null && players[p2].dead == false) { //Si no tienen ninguno aliado se juntan
			players[p1].ally = p2;
			players[p2].ally = p1;
			txt += players[p1] + " se ha juntado con " + players[p2];
		} else {
			nextTurn();
			return;
		}

		embd.setColor("#7fff00");
	}
	else if (rndMove == 2) { //KILL//////////////////////////////////////////////////////////////////////////
		var p2 = Math.floor(Math.random * players.length);

		embd.setColor("#ff0000");
	}

	txt += "\n\n" + returnStats(p1);

	var jgRestantes = 0;
	for (var i = 0; i < players.length; i++) {
		if (!players[i].dead)
			jgRestantes++;
	}
	embd.setFooter("Quedan " + jgRestantes + " jugadores restantes" + "\nIntroduce -show para ver el estado actual de la partida");
	embd.setDescription(txt);
	dc.send(embd);

	turnoN += 1;
}

function returnStats(pid) {
	if (players[pid] != null) {
		return (players[pid].dead != null ? (players[pid].dead ? "💀 " : "⭐ ") : "-")
			+ players[pid]
			+ " :     ⚔️"
			+ (players[pid].weapon1 != null ? weapons[players[pid].weapon1][0] : "-")
			+ "  ⚔️"
			+ (players[pid].weapon2 != null ? weapons[players[pid].weapon2][0] : "-")
			+ "  🧑‍🤝‍🧑"
			+ (players[pid].ally != null ? players[pid].ally : "-");
	} else {
		return "ERROR PLAYER" + pid;
	}
} 

bot.login(process.env.token);