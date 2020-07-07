const { Command } = require('../structures/Command')
const { MessageEmbed } = require('discord.js')
module.exports = class Help extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      aliases: [],
      requiredPermissions: null,
      dev: false
    })
  }

  async run ({ message }) {
   let embed = new MessageEmbed()
   .setTitle('Harty - Comandos e Informações')
   .setColor('#2fa14d')
   .setDescription('Bot feito com o intuito de substituir o RoVer (já que ele fica quase toda hora offline) e ajudar na hora do lock do chat nas madrugadas.')
   .addFields(
    { name: 'Comandos', value: '\`h!verify, h!instalock, h!opensv, h!ping, h!reverse, h!verify, h!whois\`', inline: true }
   )
   .setFooter('Github: https://github.com/Sazzo/Harty | Veja como o bot foi feito!')
   message.channel.send(embed)
  }
}