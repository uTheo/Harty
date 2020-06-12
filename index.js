const Discord = require('discord.js')
const axios = require('axios')
const moment = require('moment')
const serverChannels = require('./channels.json')
const canaryChannels = require('./canaryChannels.json')
const client = new Discord.Client()
client.on('ready', () => {
  console.log('[BOT] OK')
  client.user.setActivity(`thinking about u | V.${require('./package.json').version}`)
})

let prod = true
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
  if(command === 'devmode') {
      if(message.author.id === '326123612153053184') {
        prod = false
        message.channel.send('Development Mode Enabled.')
      } else {
          message.channel.send('Sem permissão.')
      }
  }
  if(command === 'prodmode') {
      if(message.author.id === '326123612153053184') {
        prod = true
        message.channel.send('Production Mode Enabled.')
      } else {
          message.channel.send('Sem permissão.')
      }
  } 
  if (command === 'verify') {
    if(prod === false) {
        return message.channel.send('``DEVMODE_ENABLED`` | O bot atualmente está em manutenção, por favor volte mais tarde.')
    }
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
      if(e.response.data.errorCode === 404 || !e.response.data === undefined) {
        let success = false
        message.reply(':warning: | Por favor, se verifique em https://verify.eryn.io (Clique em Sign With Discord) | Esperando...')
        const b = setTimeout(() => {
            clearInterval(x)
            message.reply(':x: | Após 2 minutos, eu não consegui realizar a verificação, por favor tente novamente.')
        }, 120000);
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
    }
  if (command === 'whois') {
    const member = message.mentions.members.first() || client.users.cache.get(args[0])
 	if(!member) return message.channel.send("Você esqueceu de mencionar ou indicar um ID.")
  	try {
  	const user = client.users.cache.get(message.author.id)
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
	console.log(`[LOG] ${user.tag} executou o comando whois com sucesso.`)
  		}
  	} catch (e) {
    if(e.response.data.errorCode === 404 || !e.response.data === undefined) {
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
  if(command === 'instalock') {
      console.log('EXEC')
      let canary = true
      try {
        if(prod === true) {
        console.log('EXEC PROD TRUE')
        if(message.member.roles.cache.has('573901873677860864')) {
        let membro = '486165549240287233'
           serverChannels.forEach(id => {
               let channel = client.channels.cache.get(id)
               channel.updateOverwrite(membro, { SEND_MESSAGES: false })
           })
           let coolUsers = ["Bismark","Sazz","Jaspion","Lily","SLEGHART","Lipe","DoguinhoHart","telecom","Orbot","Lord","Orcadius","dollyinhomlg","Livwu","Sunglasses","samodium","CIA","Felipz (baiano)", "Rangeel","xMarcelo","Sate","p4l","Shiny_Gen","Noob.","Mask","Gianblox","Derik","Math","Calango","ph"]
           const randomcooluser = coolUsers[Math.floor(Math.random() * coolUsers.length)];
           let lockembed = new Discord.MessageEmbed()
           .setDescription('Chats fechados, para re-abrir um Locker precisa usar o comando ``opensv``.')
           .setFooter(`${randomcooluser} é o escolhido dessa noite.`)
           .setColor('#1db546')
           message.channel.send(lockembed)
        } else {
            message.channel.send('Você não tem permissão para executar esse comando.')
        }
        }
      } catch(e) {
        console.log(e)
        message.channel.send('Um erro fatal ocorreu ao executar esse comando, por favor reporte para sazz#1660.')
      }
    }
    if(command === 'opensv') {
        console.log('EXEC')
      let canary = true
      try {
        if(prod === true) {
        console.log('EXEC PROD TRUE')
        if(message.member.roles.cache.has('573901873677860864')) {
        let membro = '486165549240287233'
           serverChannels.forEach(id => {
               let channel = client.channels.cache.get(id)
            channel.updateOverwrite(membro, { SEND_MESSAGES: null })
           })
           let lockembed = new Discord.MessageEmbed()
           .setDescription('Chats abertos.')
           .setColor('#1db546')
           message.channel.send(lockembed)
        } else {
            message.channel.send('Você não tem permissão para executar esse comando.')
        }
        }
        if(prod === false) {
            console.log('EXEC PROD FALSE')
            if(message.member.roles.cache.has('719034413392068648')) {
            let membroC = '719034218130178088'
           canaryChannels.forEach(id => {
               let channelC = client.channels.cache.get(id)
               channelC.updateOverwrite(membroC, { SEND_MESSAGES: null })
           })
           let lockembedC = new Discord.MessageEmbed()
           .setDescription('Chats abertos.')
           .setColor('#1db546')
           message.channel.send(lockembedC)
        } else {
            message.channel.send('Sem permissão.')
        }
        }
      } catch(e) {
        console.log(e)
        message.channel.send('Um erro fatal ocorreu ao executar esse comando, por favor reporte para sazz#1660.')
      }
    }
    if(command === 'cagadafix') {
    if(message.author.id === '326123612153053184') {
    serverChannels.forEach(id => {
    let channel = client.channels.cache.get(id)
    let membro = '719025911978000396'
    channel.updateOverwrite(membro, { MANAGE_ROLES: true })
    });

      } else {
          message.channel.send('Sem permissão.')
      }
    }
})
client.on('guildMemberAdd', async member => {
  try {
    const response = await axios.get(`https://verify.eryn.io/api/user/${member.id}`)
    if (response.data.status === 'ok') {
      const verified = member.guild.roles.cache.get('498294566483656707')
      const noVerified = member.guild.roles.cache.get('567787227258552333')
      console.log(`[AutoVerify] ${member.displayName} foi verificado ao entrar com a conta ${response.data.robloxUsername} (${response.data.robloxId})`)
      setTimeout(() => {
      member.roles.add(verified).catch(console.error)
      member.roles.remove(noVerified).catch(console.error)
      }, 15000);
      member.send('Olá! Seja bem vindo ao servidor do SLEGHART! Eu encontrei você no banco de dados de verificados, então você recebera os cargos em 15 segundos (para evitar conflito com outros bots).')
    }
  } catch (e) {
    if(e.response.data.errorCode === 404) {
      console.log(`[AutoVerify] ${member.displayName} não existe no banco de dados da RoVer, ou aconteceu um erro inesperado.`)
    }
  }
})
client.login(process.env.TOKEN)
