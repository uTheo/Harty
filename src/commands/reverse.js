const { Command } = require('../structures/Command')
const { Roles } = require('../util/roles')
module.exports = class Reverse extends Command {
  constructor (client) {
    super(client, {
      name: 'reverse',
      aliases: [],
      requiredPermissions: null,
      dev: false
    })
  }

  async run ({ message }) {
    try {
        message.member.roles.remove(Roles.verified).catch(console.error)
        message.member.roles.add(Roles.noVerified).catch(console.error)
        message.reply('Seu cargo de verificado foi retirado.')
      } catch (e) {
        message.reply('Um erro fatal ocorreu, por favor tente novamente')
      }
  }
}