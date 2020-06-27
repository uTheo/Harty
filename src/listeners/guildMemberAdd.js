const axios = require('axios')
const { Roles } = require('../util/roles')
const { Role } = require('discord.js')
module.exports = class guildMemberAdd {
    constructor (client) {
      this.client = client
    }
    async run(member) {
        try {
            const response = await axios.get(`https://verify.eryn.io/api/user/${member.id}`)
            if (response.data.status === 'ok') {
              const verified = member.guild.roles.cache.get(Roles.verified)
              const noVerified = member.guild.roles.cache.get(Roles.noVerified)
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
            } else {
                console.log(e)
            }
    }
}
}