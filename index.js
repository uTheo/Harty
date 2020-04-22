const Discord = require("discord.js")
const axios = require("axios")
const moment = require("moment")
const client = new Discord.Client()
client.on("ready", () => {
  console.log(`[BOT] OK`); 
  client.user.setActivity(`Familía HART`);
});


const prefix = "h!"
require('dotenv').config()
// const baseUrl = "https://verify.eryn.io/api/user/"
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "verify") {
  try {
     const response = await axios.get(`https://verify.eryn.io/api/user/${message.author.id}`)
      if(response.data.status === "ok") {
      let verified = message.guild.roles.cache.get("498294566483656707");
      let noVerified = message.guild.roles.cache.get("567787227258552333")
      message.member.roles.add(verified).catch(console.error);
      message.member.roles.remove(noVerified).catch(console.error);
      message.channel.send(`Seja Bem-Vindo, **${response.data.robloxUsername}**, espero que tenha bom proveito dos chats do servidor (=`)
      console.log(`[LOG] ${message.member.user.tag} se verificou com a conta ${robloxUsername}`)
      }
  } catch(e) {
   message.channel.send(`Olá! Se verifique em: https://verify.eryn.io (Clique em **Sign With Discord**), após isso use o comando ${prefix}verify novamente.`)
  }
  }
 if(command === "whois") {
 	const member = message.mentions.members.first() || client.users.cache.get(args[0])
 	if(!member) return message.channel.send("Você esqueceu de mencionar ou indicar um ID.")
  	try {
  	const rover = await axios.get(`https://verify.eryn.io/api/user/${member.id}`)
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
client.login(process.env.TOKEN)