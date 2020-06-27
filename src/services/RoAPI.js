const axios = require('axios')
const { Roles } = require('../util/roles')
const Discord = require('discord.js')
const { 
    parseISO, 
    format, 
    formatRelative, 
    formatDistance 
} = require('date-fns')
const { parse } = require('path')
module.exports.RoAPI = class RoAPI {
    constructor(message) {
        this.message = message
    }
    async verify_user(id) {
    if(!id || id === undefined || id === null) {
        console.log('No ID specified.')
        this.message.reply('Vish, parece que eu não encontrei nenhum ID nessa requisição, se isso parecer estranho para você, reporte para sazz#1660.')
        return
    }
     const primaryResponse = await axios.get(`https://verify.eryn.io/api/user/${id}`)
     if(primaryResponse.data.status === 'ok') {
        const verified = this.message.guild.roles.cache.get(Roles.verified)
        const noVerified = this.message.guild.roles.cache.get(Roles.noVerified)
        this.message.member.roles.add(verified).catch(console.error)
        this.message.member.roles.remove(noVerified).catch(console.error)
        this.message.reply(`:green_apple: | Seja Bem Vindo ${primaryResponse.data.robloxUsername}! `)
    }
}
    async whois(id) {
        try {
        const rover = await axios.get(`https://verify.eryn.io/api/user/${id}`)
        if(rover.data.status === "ok") {
        const getRobloxDetails = await axios.get(`https://users.roblox.com/v1/users/${rover.data.robloxId}`)
        const getRobloxStatus = await axios.get(`https://api.roblox.com/users/${rover.data.robloxId}/onlinestatus`)
        const lastOnline = getRobloxStatus.data.LastOnline
        // Formatar Data
        const pt = require('date-fns/locale/pt')
        let lastISO = parseISO(lastOnline)
        let createdISO = parseISO(getRobloxDetails.data.created)
        const formattedLast = format(
            lastISO, 
            'dd/MM/yyyy'
        );
        const formattedCreated = format(
            createdISO, 
            "MM/dd/yyyy"
        );
        const whoisEmbed = new Discord.MessageEmbed()
	    .setColor('#ed2f21')
	    .setDescription(getRobloxDetails.data.description)
	    .setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username=${rover.data.robloxUsername}`)
	    .setTitle(`Informações sobre ${rover.data.robloxUsername}`)
	    .addFields(
		{ name: 'Conta criada em', value: formattedCreated },
		{ name: 'Status', value: getRobloxStatus.data.LastLocation },
		{ name: 'Ultima vez que esteve online', value: formattedLast },
		{ name: 'Perfil do Roblox', value: `https://www.roblox.com/users/${rover.data.robloxId}/profile` },
	    )
	    .setTimestamp();
        this.message.channel.send(whoisEmbed)
        }
    } catch (e) {
        if(e.response.data.errorCode === 404 || e.response.data === undefined) {
            this.message.reply('Esse usuário não está verificado no banco de dados da RoVer.')
          }
    }
}
}
