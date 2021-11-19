const Discord = require("discord.js");


module.exports.help = {
  name:"botinfo",
  usage: "botinfo",
  description: "Find information about the bot."
}

module.exports.run = async (client, message, args) => {
  const msg = await message.reply(`Pinging...`);
		msg.edit({content: "** **", embeds: [new Discord.MessageEmbed().setTitle("Bot Info!").setColor("RANDOM").addField("Users", `${client.users.cache.size}`, true).addField("Servers", `${client.guilds.cache.size}`, true).addField("Channels", `${client.channels.cache.size}`, true).addField("Emojis", `${client.emojis.cache.size}`, true).addField(`Ping to API:`, `${client.ws.ping} ms`, true).addField("Message Ping:", `${msg.createdTimestamp - message.createdTimestamp} ms`, true).addField("Uptime", `${Math.floor(client.uptime / 86400000)} days ${Math.floor(client.uptime / 3600000) % 24} hours ${Math.floor(client.uptime / 60000) % 60} minutes ${Math.floor(client.uptime / 1000) % 60} seconds`).addField("Developer(s)", "\`\`\`yml\nProgramming: Malbouy#3421\nTesters: DuDe MaC#7780, WiZU#4120, Charls#9014\`\`\`").setThumbnail(`${client.user.avatarURL()}`).setTimestamp().setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic:true})}`)]});
}