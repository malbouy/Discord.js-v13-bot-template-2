const Discord = require('discord.js')

module.exports.help = {
  name: "ping",
  description: 'Nothing much, wbu?'
}

module.exports.run = async (client, message, args) => {
  message.channel.send('🏓 Pong! I am alive bro')
}