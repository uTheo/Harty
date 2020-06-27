const { Command } = require('../structures/Command')
const serverChannels = require('../../channels.json')
module.exports = class OpenSV extends Command {
  constructor (client) {
    super(client, {
      name: 'opensv',
      aliases: [],
      requiredPermissions: null,
      dev: false
    })
  }

  async run ({ message }) {
    try {
        if(message.member.roles.cache.has('573901873677860864')) {
        let membro = '486165549240287233'
           serverChannels.forEach(id => {
            let channel = client.channels.cache.get(id)
            if(channel === undefined || channel === null) return;
            channel.updateOverwrite(membro, { SEND_MESSAGES: null })
           })
           let lockembed = new Discord.MessageEmbed()
           .setDescription('Chats abertos.')
           .setColor('#1db546')
           message.channel.send(lockembed)
        } else {
            message.channel.send('Você não tem permissão para executar esse comando.')
        }
    } catch(e) {
        console.log(e)
        message.channel.send('Um erro fatal ocorreu ao executar esse comando, por favor reporte para sazz#1660.')
    }
  }
}