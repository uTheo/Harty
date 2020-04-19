const Discord = require("discord.js")
const axios = require("axios")
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
 	 axios.get(`https://verify.eryn.io/api/user/${member.id}`)
  	.then(function(response) {
  	if(response.data.status === "error") {
  			message.channel.send("Parece que esse usuário não está verificado na database do RoVer.")
  			return
  		}
  	if(response.data.status === "ok") {
	const whoisEmbed = new Discord.MessageEmbed()
	.setColor('#ed2f21')
	.setTitle('Whois')
	.addFields(
		{ name: 'Roblox Username', value: response.data.robloxUsername },
		{ name: 'Roblox ID', value: response.data.robloxId },
	)
	.setTimestamp();
	message.channel.send(whoisEmbed)
  		}

  	})
 }
})
client.login("NzAxNDI4MDQ0MDY5NjAxMzM0.XpxV1w.3Hw5EjajoDt3YiKY1h0g-SuWZIk")
