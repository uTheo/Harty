const Discord = require("discord.js")
const axios = require("axios")
const moment = require("moment")
const client = new Discord.Client()
client.on("ready", () => {
  console.log(`[BOT] OK`); 
  client.user.setActivity(`Familía HART`);
});
const prefix = "h!"
// const baseUrl = "https://verify.eryn.io/api/user/"


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "verify") {
  axios.get(`https://verify.eryn.io/api/user/${message.author.id}`)
  	.then(function(response) {
  		if(response.data.status === "error") {
  			message.channel.send("Olá! Por favor se verifique em: https://verify.eryn.io (Clique em **Sign With Discord**), após isso use o comando r!verify novamente.")
  			return
  		}
  		if(response.data.status === "ok") {
  		let verified = message.guild.roles.cache.get("498294566483656707");
  		message.member.roles.add(verified).catch(console.error);
  		message.channel.send(`Seja Bem-Vindo, **${response.data.robloxUsername}**, espero que tenha bom proveito dos chats do servidor (=`)
  		}
  	})
  }
 if(command === "whois") {
 	const member = message.mentions.members.first();
 	if(!member) return message.channel.send("Por Favor, mencione algum usuário.")
  	try {
  	const rover = await axios.get(`https://verify.eryn.io/api/user/${member.id}`)
  	if(rover.data.status === "error") {
  			message.channel.send("Parece que esse usuário não está verificado na database do RoVer.")
  			return
  		}
  	if(rover.data.status === "ok") {
  	moment.locale('pt-br')
  	const getRobloxDetails = await axios.get(`https://users.roblox.com/v1/users/${rover.data.robloxId}`)
  	const getRobloxStatus = await axios.get(`https://api.roblox.com/users/${rover.data.robloxId}/onlinestatus`)
  	const lastOnline = getRobloxStatus.data.LastOnline
  	const createdDate = moment(getRobloxDetails.data.created)
	const whoisEmbed = new Discord.MessageEmbed()
	.setColor('#ed2f21')
	.setDescription(getRobloxDetails.data.description)
	.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username=${rover.data.robloxUsername}`)
	.setTitle(`Informações sobre ${rover.data.robloxUsername}`)
	.addFields(
		{ name: 'Roblox Username', value: rover.data.robloxUsername },
		{ name: 'Conta criada em', value: createdDate },
		{ name: 'Status', value: getRobloxStatus.data.LastLocation },
		{ name: 'Ultima vez que esteve online', value: moment(lastOnline) },
		{ name: 'Perfil do Roblox', value: `https://www.roblox.com/users/${rover.data.robloxId}/profile` },
	)
	.setTimestamp();
	message.channel.send(whoisEmbed)
  		}
  	} catch(e) {
  	message.channel.send('Parece que esse usuário não está verificado na database do RoVer.')
  	}

  	
 }
})
client.login("NzAxNDI4MDQ0MDY5NjAxMzM0.XpxV1w.3Hw5EjajoDt3YiKY1h0g-SuWZIk")
