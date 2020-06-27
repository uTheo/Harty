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
    try {
    message.reply('Verificando...')
    roAPI.verify_user(message.author.id)
      } catch(e){
        if(e.response.data.errorCode === 404 || !e.response.data === undefined) {
          message.reply(':warning: | Por favor, se verifique em https://verify.eryn.io (Clique em Sign With Discord) e use novamente o comando h!verify')
        } else {
          message.reply('Parece que um erro fatal ocorreu, por favor tente novamente.')
        }
        }
  }
}