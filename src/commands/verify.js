const { Command } = require('../structures/Command')
const axios = require('axios')
const { RoAPI } = require('../services/RoAPI')
module.exports = class Verify extends Command {
  constructor (client) {
    super(client, {
      name: 'verify',
      aliases: [],
      requiredPermissions: null,
      dev: false
    })
  }

  async run ({ message }) {
    const roAPI = new RoAPI(message)
    message.reply('Verificando...')
    roAPI.verify_user(message.author.id)
  }
}