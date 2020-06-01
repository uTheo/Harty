const Discord = require('discord.js')
const axios = require('axios')
const moment = require('moment')
const client = new Discord.Client()
client.on('ready', () => {
  console.log('[BOT] OK')
  client.user.setActivity(`Verificando... | V.${require('./package.json').version}`)
})

 // TODO: if a user not have a not verified role and send a message, the bot add the no verified role.
// TODO: COOLDOWN (due to api ratelimit woosh)

const prefix = 'h!'
require('dotenv').config()
client.on('message', async message => {
  if (message.author.bot) return
  if (message.content.indexOf(prefix) !== 0) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const verified = message.guild.roles.cache.get('498294566483656707')
  const noVerified = message.guild.roles.cache.get('567787227258552333')
  if (command === 'verify') 
    try {
      const primaryResponse = await axios.get(`https://verify.eryn.io/api/user/${message.author.id}`)
      if(primaryResponse.data.status === 'ok') {
          // success = true
          message.member.roles.add(verified).catch(console.error)
          message.member.roles.remove(noVerified).catch(console.error)
          message.reply(`:green_apple: | Seja Bem Vindo ${primaryResponse.data.robloxUsername}! `)
          return
      }
    } catch(e){
      if(e.response.status === 404) {
        let success = false
        message.reply(':warning: | Por favor, se verifique em https://verify.eryn.io (Clique em Sign With Discord) | Esperando...')
        const b = setTimeout(() => {
            clearInterval(x)
<<<<<<< HEAD
            message.channel.send(':x: | Após 1 minuto, eu não consegui realizar a verificação, por favor tente novamente.')
=======
            console.log('Timeout')
            message.channel.send(':x: | Após 2 minutos, eu não consegui realizar a verificação, por favor tente novamente.')
>>>>>>> 8e9a4c0edcd3de51647ae6690f93a2dcabf3058d
        }, 60000);
        const x = setInterval(async () => {
          const secondResponse = await axios.get(`https://verify.eryn.io/api/user/${message.author.id}`)
          if(secondResponse.data.robloxId === undefined) {
            success = false
          } else {
            success = true
          }
          if(success === true) {
            message.member.roles.add(verified).catch(console.error)
            message.member.roles.remove(noVerified).catch(console.error)
            message.reply(`:green_apple: | Seja Bem Vindo ${primaryResponse.data.robloxUsername}! `)
            clearInterval(x)
            clearTimeout(b)
            return
          }
        }, 5000);
      } else {
        message.reply('Parece que um erro fatal ocorreu, por favor tente novamente.')
      }
      }
  if (command === 'whois') {
    const member = message.mentions.members.first() || client.users.cache.get(args[0])
    if (!member) return message.reply('Você esqueceu de mencionar ou indicar um ID.')
    try {
      const user = client.users.cache.get(message.author.id)
      const rover = await axios.get(`https://verify.eryn.io/api/user/${member.id}`)
      if (rover.data.status === 'ok') {
        const getRobloxStatus = await axios.get(`https://api.roblox.com/users/${rover.data.robloxId}/onlinestatus`)
        const lastOnline = getRobloxStatus.data.LastOnline
        const createdDate = moment(getRobloxDetails.data.created)
        const whoisEmbed = new Discord.MessageEmbed()
          .setColor('#ed2f21')
          .setDescription(getRobloxDetails.data.description)
          .setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username=${rover.data.robloxUsername}`)
          .setTitle(`Informações sobre ${rover.data.robloxUsername}`)
          .addFields(
            { name: 'Username', value: rover.data.robloxUsername },
            { name: 'Conta criada em', value: createdDate },
            { name: 'Status', value: getRobloxStatus.data.LastLocation },
            { name: 'Ultima vez que esteve online', value: moment(lastOnline) },
            { name: 'Perfil do Roblox', value: `https://www.roblox.com/users/${rover.data.robloxId}/profile` }
          )
          .setTimestamp()
        message.channel.send(whoisEmbed)
        console.log(`[LOG] ${user.tag} executou o comando whois com sucesso.`)
  		}
  	} catch (e) {
    if(e.response.status === 404) {
      message.channel.send('Parece que esse usuário não está verificado na database do RoVer.')
  	  console.log(`[LOG] ${user.tag} tentou executar o comando whois, porém sem sucesso.`)
    } else {
      message.channel.send('Parece que um erro fatal ocorreu, por favor tente novamente.')
    }
  	}
  }
  if (command === 'reverse') {
    try {
      message.member.roles.remove(verified).catch(console.error)
      message.member.roles.add(noVerified).catch(console.error)
      message.reply('Seu cargo de verificado foi retirado.')
    } catch (e) {
      message.reply('Um erro fatal ocorreu, por favor tente novamente')
    }
  }
client.on('guildMemberAdd', async member => {
  try {
    const response = await axios.get(`https://verify.eryn.io/api/user/${member.id}`)
    if (response.data.status === 'ok') {
      const verified = member.guild.roles.cache.get('498294566483656707')
      const noVerified = member.guild.roles.cache.get('567787227258552333')
      console.log(`[AutoVerify] ${member.displayName} foi verificado ao entrar com a conta ${response.data.robloxUsername} (${response.data.robloxId})`)
      member.roles.add(verified).catch(console.error)
      member.roles.remove(noVerified).catch(console.error)
    }
  } catch (e) {
    if(e.response.status === 404) {
      console.log(`[AutoVerify] ${member.displayName} não existe no banco de dados da RoVer, ou aconteceu um erro inesperado.`)
    }
  }
})
})
client.login(process.env.TOKEN)
