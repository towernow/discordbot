﻿const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Njc2MTI0Mzk1Nzg1NDIwODAx.Xkqy5Q.jpuZuQRI1Lw0eoX0z17uc10UMws";
const pre = "-"; //Time ms (86400*1000)/3(un dia);

/////////////////////////////////////////////////////////////////////////////////////
//https://discordapp.com/oauth2/authorize?client_id=676124395785420801&scope=bot&permissions=1341652289
/////////////////////////////////////////////////////////////////////////////////////


var master, dc, startedGame = false, turnoN = 0, intervalMain, everyMSeconds = 1000;
var players = [];
var weapons = [
	["Puños", 0]
];

bot.on("ready", () => {
	console.log("BOT IS ONLINE!");
	bot.user.setActivity("Press -helpbr");
})

const fs = require("fs");
bot.database = require("./database.json");

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
	else if (txt.indexOf("GILIPOLLAS") != -1 || txt.indexOf("IMBECIL") != -1) {
		msg.channel.send("tu madre");
	}
	else if (txt.indexOf("LLOR") != -1) {
		msg.channel.send("te traigo uns mocadors o que tio?");
	}
	else if ((" " + txt + " ").indexOf(" TU ") != -1 || (" " + txt + " ").indexOf(" TU, ") != -1 || (" " + txt + " ").indexOf(" ,TU ") != -1) {
		msg.channel.send("te estas jugando un baneo loko..");
	}


	let args = msg.content.substring(pre.length).split(" ");
	switch (args[0].toUpperCase()) {
	
		case "IMMASTER":
			if(master == null){
				master = msg.author;
				msg.author.send("You are now master.");
			}
		break;
		
		case "TEST1":
			bot.database[msg.author.username] = {
				message: msg.content
			}
			fs.writeFile("./database.json", JSON.stringfy(bot.database, null, 4), err =>{
				if(err) throw err;
				msg.channel.send("message written");
			});
		break;
		case "TEST2":
			let _message = bot.database[msg.author.username].message;
			msg.channel.send("message is: " + _message);
		break;

		case "HELPBR":
			var txt = "**Commands:**\n";
			txt += "-helpbr\n";
			txt += "-show\n";
			txt += "-showweapons\n";
			txt += "-addplayer [@Mention] 👑\n";
			txt += "-removeplayer [indexNum] 👑\n";
			txt += "-addweapon [weapon name] [weapon power] 👑\n";
			txt += "-removeweapon [indexNum] 👑\n";
			txt += "-startbr [time in seconds]👑\n";
			txt += "-resetbr 👑\n";

			var embd = new Discord.RichEmbed()
				.setColor("#ffff00")
				.setTitle("🌟JUGONES BATTLE ROYALE🌟")
				.setDescription(txt)
			dc.send(embd);
		break;

		case "ADDPLAYER":
			if (msg.author == master && !startedGame && args[1] != null) {
				var mention = msg.mentions.users.first();
				if (mention == null) {
					var strObj = new String(args[1]);
					players.push(strObj);
				} else {
					players.push(mention);
				}

				players[players.length - 1].dead = false;
				players[players.length - 1].weapon1 = 0;
				players[players.length - 1].weapon2 = 0;
				players[players.length - 1].ally = null;

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("⭐ Added player " + players[players.length - 1])
				dc.send(embd);
				msg.delete(1000);
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
				msg.delete(1000);
			}
		break;

		case "REMOVEWEAPON":
			if (msg.author == master && !startedGame && args[1] != null) {
				var idx = args[1];

				if (idx > -1) {
					weapons.splice(idx, 1);
				}

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("Removed weapon **" + idx)
				dc.send(embd);
				msg.delete(1000);
			}
		break;

		case "ADDWEAPON":
			if (msg.author == master && args[1] != null && args[2] != null) {
				weapons.push([args[1], args[2]]);

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("⚔️ Added weapon **" + weapons[weapons.length - 1][0] + "** with power " + weapons[weapons.length - 1][1]);
				dc.send(embd);
				msg.delete(1000);
			}
		break;

		case "STARTBR":
			if (msg.author == master && args[1] != null && !startedGame) {
				everyMSeconds = args[1] * 1000;
				startedGame = true;
				nextTurn();
				intervalMain = setInterval(nextTurn, everyMSeconds);

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("¡DA COMIENZO EL JUGONES BATTLE ROYALE!");
				dc.send(embd);
				msg.delete(1000);
			}
		break;

		case "RESETBR":
			if (msg.author == master) {
				master = null;
				startedGame = false;
				dc = null;
				players = [];
				weapons = [
					["Puños", 0]
				];
				turnoN = 0;
				clearInterval(intervalMain);

				var embd = new Discord.RichEmbed()
					.setColor("#ffff00")
					.setTitle("🌟JUGONES BATTLE ROYALE🌟")
					.setDescription("BATTLE ROYALE RESETED");
				dc.send(embd);
				msg.delete(1000);
			}
		break;

		case "SHOWWEAPONS":
			var text = "";
			for (var i = 0; i < weapons.length; i++) {
				text += "⚔️ **" + weapons[i][0] + "** with power " + weapons[i][1] + "\n";
			}

			var embd = new Discord.RichEmbed()
				.setColor("#ffff00")
				.setTitle("🌟JUGONES BATTLE ROYALE🌟")
				.setDescription(text)
			dc.send(embd);
			msg.delete(1000);
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
				.setFooter("Quedan " + jgRestantes + " jugadores restantes.");
			dc.send(embd);
			msg.delete(1000);
		break;

	}
})

function nextTurn(rndMove) {
	var txt = "";
	var p1, p2 = null;
	do {
		p1 = Math.floor(Math.random() * players.length);
	} while (players[p1].dead);

	var embd = new Discord.RichEmbed();
	embd.setTitle("🌟JUGONES BATTLE ROYALE🌟")

	if (turnoN % 3 == 0)
		txt += "AMANECER";
	else if (turnoN % 3 == 1)
		txt += "TARDE";
	else if (turnoN % 3 == 2)
		txt += "MEDIANOCHE";
	txt += " DEL DÍA " + (Math.floor(turnoN / 3)+1) + "\n--------------------------------------\n\n";

	if(rndMove == null)
		rndMove = Math.floor(Math.random() * 5);
	if (rndMove == 1 || rndMove == 2) { //WEAPON//////////////////////////////////////////////////////////////////////////
		var weap = Math.floor(Math.random() * (weapons.length - 1)) + 1;

		if (weap == players[p1].weapon1) { //Pierde objetos
			txt += players[p1] + " ha tropezado y ha perdido su **" + weapons[players[p1].weapon1][0] + "** y su **" + weapons[players[p1].weapon2][0] + "**";
			players[p1].weapon1 = 0;
			players[p1].weapon2 = 0;
		} else if (weap == players[p1].weapon2) { //Altar sataniko
			do {
				p2 = Math.floor(Math.random() * players.length);
			} while (!players[p2].dead);

			players[p2].dead = false;
			players[p2].weapon1 = 0;
			players[p2].weapon2 = 0;
			players[p2].ally = null;

			txt += players[p1] + " ha encontrado **un altar sataniko** y ha revivido a " + players[p2];
		}
		else {
			txt += players[p1] + " ha encontrado **" + weapons[weap][0] + "**";

			if (players[p1].weapon1 == 0) {
				players[p1].weapon1 = weap;
			} else if (players[p1].weapon2 == 0) {
				players[p1].weapon2 = weap;
			} else {
				if (weapons[players[p1].weapon1][1] < weapons[players[p1].weapon2][1]) { //Si el poder del arma 1 es menor que el de arma 2
					txt += " y ha lanzado su **" + weapons[players[p1].weapon1][0] + "**";
					players[p1].weapon1 = weap;
				} else {
					txt += " y ha lanzado su **" + weapons[players[p1].weapon2][0] + "**";
					players[p1].weapon2 = weap;
				}
			}
		}
		embd.setColor("#0000ff");
	}
	else if (rndMove == 3 || rndMove == 4) { //ALLY//////////////////////////////////////////////////////////////////////////
		do {
			p2 = Math.floor(Math.random() * players.length);
		} while (p1 == p2 && players[p2].dead == false);

		if (players[p1].ally == p2) { //Si coincide nuevo aliado con actual aliado -> abandono
			players[p1].ally = null;
			players[p2].ally = null;
			txt += players[p1] + " ha abandonado a " + players[p2];
		} else if (players[p1].ally == null && players[p2].ally == null) { //Si no tienen ninguno aliado se juntan
			players[p1].ally = p2;
			players[p2].ally = p1;
			txt += players[p1] + " se ha juntado con " + players[p2];
		} else {
			nextTurn();
			return;
		}

		embd.setColor("#7fff00");
	}
	else if (rndMove == 0) { //KILL//////////////////////////////////////////////////////////////////////////
		do {
			p2 = Math.floor(Math.random() * players.length);
		} while (players[p2].dead);

		if (p1 == p2) { //suicidio
			var probability = Math.floor(Math.random() * 5);
			if (probability == 0) {
				txt += players[p1] + " se ha suicidado";
				players[p1].dead = true;
				if (players[p1].ally != null)
					players[players[p1].ally].ally = null;
			} else if (probability == 1) {
				do {
					p2 = Math.floor(Math.random() * players.length);
				} while (players[p2].dead && p1==p2);

				txt += players[p1] + " se ha immolado junto a " + players[p2];
				players[p1].dead = true;
				players[p2].dead = true;
				if (players[p1].ally != null)
					players[players[p1].ally].ally = null;
				if (players[p2].ally != null)
					players[players[p2].ally].ally = null;
			} else {
				nextTurn(0);
				return;
			}
		} else if (players[p1].ally == p2) { //traicion aliado
			txt += players[p1] + " ha asesinado por la espalda a " + players[p2];
			players[p2].dead = true;
			players[p1].ally = null;
			players[p2].ally = null;

			if (weapons[players[p2].weapon1][1] > weapons[players[p1].weapon1][1]) {
				players[p1].weapon1 = players[p2].weapon1;
				players[p2].weapon1 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
			else if (weapons[players[p2].weapon1][1] > weapons[players[p1].weapon2][1]) {
				players[p1].weapon2 = players[p2].weapon2;
				players[p2].weapon1 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
			else if (weapons[players[p2].weapon2][1] > weapons[players[p1].weapon1][1]) {
				players[p1].weapon1 = players[p2].weapon1;
				players[p2].weapon2 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
			else if (weapons[players[p2].weapon2][1] > weapons[players[p1].weapon2][1]) {
				players[p1].weapon2 = players[p2].weapon2;
				players[p2].weapon2 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
		} else { //pelea
			var pow1 = weapons[players[p1].weapon1][1] + weapons[players[p1].weapon2][1];
			var pow2 = weapons[players[p2].weapon1][1] + weapons[players[p2].weapon2][1];
			var rndPow1 = Math.floor(Math.random() * (pow1+1));
			var rndPow2 = Math.floor(Math.random() * (pow2+1));

			if (rndPow1 >= rndPow2) {
				txt += players[p1] + " ha asesinado con **" + weapons[players[p1].weapon1][0] + "** y **" + weapons[players[p1].weapon2][0] + "** a " + players[p2];
				players[p2].dead = true;
				if (players[p2].ally != null)
					players[players[p2].ally].ally = null;
			} else {
				txt += players[p2] + " ha asesinado con **" + weapons[players[p2].weapon1][0] + "** y **" + weapons[players[p2].weapon2][0] + "** a " + players[p1];
				players[p1].dead = true;
				if (players[p1].ally != null)
					players[players[p1].ally].ally = null;
			}

			if (weapons[players[p2].weapon1][1] > weapons[players[p1].weapon1][1]) {
				players[p1].weapon1 = players[p2].weapon1;
				players[p2].weapon1 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
			else if (weapons[players[p2].weapon1][1] > weapons[players[p1].weapon2][1]) {
				players[p1].weapon2 = players[p2].weapon2;
				players[p2].weapon1 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
			else if (weapons[players[p2].weapon2][1] > weapons[players[p1].weapon1][1]) {
				players[p1].weapon1 = players[p2].weapon1;
				players[p2].weapon2 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
			else if (weapons[players[p2].weapon2][1] > weapons[players[p1].weapon2][1]) {
				players[p1].weapon2 = players[p2].weapon2;
				players[p2].weapon2 = 0;
				txt += " y se ha llevado su **" + weapons[players[p1].weapon2][0] + "**";
			}
		}

		embd.setColor("#ff0000");
	}
	
	txt += ".\n\n" + returnStats(p1);
	if (p2 != null && p2 != p1) {
		txt += "\n" + returnStats(p2);
	}

	var jgRestantes = 0;
	for (var i = 0; i < players.length; i++) {
		if (!players[i].dead)
			jgRestantes++;
	}
	embd.setFooter("Quedan " + jgRestantes + " jugadores restantes." + "\nIntroduce -show para ver el estado actual de la partida.");
	embd.setDescription(txt);
	dc.send(embd);
	checkWin();

	turnoN += 1;
}

function checkWin() {
	var jgRestantes = 0;
	for (var i = 0; i < players.length; i++) {
		if (!players[i].dead)
			jgRestantes++;
	}

	if (jgRestantes <= 1) {
		var winner; 
		for (var i = 0; i < players.length; i++) {
			if (!players[i].dead)
				winner = i;
		}

		var embd = new Discord.RichEmbed()
			.setColor("#ffff00")
			.setTitle("🎆JUGONES BATTLE ROYALE🎆")
			.setDescription("VICTORIA ROYALE\nEl vencedor es " + players[winner])
			.setFooter("Queda " + jgRestantes + " jugador restante." + "\nIntroduce -show para ver el estado final de la partida.");
		dc.send(embd);

		clearInterval(intervalMain);
	}
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
			+ (players[pid].ally != null ? players[players[pid].ally] : "-");
	} else {
		return "ERROR PLAYER" + pid;
	}
} 

bot.login(process.env.token);