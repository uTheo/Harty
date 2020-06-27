const { Command } = require('../structures/Command')
const { RoAPI } = require('../services/RoAPI')
module.exports = class Whois extends Command {
  constructor (client) {
    super(client, {
      name: 'whois',
      aliases: [],
      requiredPermissions: null,
      dev: false
    })
    this.client = client
  }

  async run ({ message, args }) {
    const member = message.mentions.members.first() || this.client.users.cache.get(args[0])
    if(!member) return message.channel.send("Você esqueceu de mencionar ou indicar um ID.")
    const roAPI = new RoAPI(message)
    roAPI.whois(member.id)
    }
  }