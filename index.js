const Discord = require("discord.js")
const axios = require("axios")
const client = new Discord.Client()
client.on("ready", () => {
  console.log(`[BOT] OK`); 
  client.user.setActivity(`free robux`);
});
const prefix = "r!"
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
  		let verified = message.guild.roles.cache.get("701428883353894953");
  		message.member.roles.add(verified).catch(console.error);
  		message.channel.send(`Seja Bem-Vindo, **${response.data.robloxUsername}**, espero que tenha bom proveito dos chats do servidor (=`)
  		}
  	})
  }
})
client.login("NzAxNDI4MDQ0MDY5NjAxMzM0.XpxV1w.3Hw5EjajoDt3YiKY1h0g-SuWZIk")
