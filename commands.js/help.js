const db = require('quick.db');
const Discord = require('discord.js');

module.exports.help = {
    name: "help",
    aliases: ['commands', 'cmds'],
    description: "Help command"
}

module.exports.run = async (client, message, args) => {
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.username}'s help`)
    .setDescription(client.commands.map(x => `\`${x.help.name}\` - ${x.help.description}`).join(',\n') || "NONE" )
    .setFooter(`${client.user.username} bot by Malbouy#3421`, message.guild.iconURL({dynamic:true}))
    message.channel.send({embeds: [embed]})
  } else {
    const walker = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!walker) {
      message.channel.send("No matching command found, try again?")
      return;
    } else {
      const hEmbed = new Discord.MessageEmbed()
      .setTitle(`${client.user.username}'s help`)
      .addField(`Command Name`, `\`${walker.help.name}\``, true)
      .addField(`Aliases`, `\`${walker.help.aliases.join(",\n")}\``, true)
      .addField(`Description`, walker.help.description, true)
      .setThumbnail(client.user.avatarURL())
      .setFooter(`${client.user.username} bot by Malbouy#3421`, message.guild.iconURL({dynamic:true}))
      message.channel.send({embeds: [hEmbed]})
    }
  }
}