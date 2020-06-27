const { Command } = require('../structures/Command')
const serverChannels = require('../../channels.json')
const Discord = require('discord.js')
const { coolUsers } = require('../util/coolusers')
module.exports = class InstaLock extends Command {
  constructor (client) {
    super(client, {
      name: 'instalock',
      aliases: [],
      requiredPermissions: null,
      dev: false
    })
    this.client = client
  }

  async run ({ message }) {
    try {
    if(message.member.roles.cache.has('573901873677860864')) {
        let membro = '486165549240287233'
           serverChannels.forEach(id => {
               let channel = this.client.channels.cache.get(id)
               if(channel === undefined || channel === null) return;
               channel.updateOverwrite(membro, { SEND_MESSAGES: false })
           })
           const randomcooluser = coolUsers[Math.floor(Math.random() * coolUsers.length)];
           let lockembed = new Discord.MessageEmbed()
           .setDescription('Chats fechados, para re-abrir um Locker precisa usar o comando ``opensv``.')
           .setFooter(`${randomcooluser} é o(a) escolhido(a) dessa noite.`)
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