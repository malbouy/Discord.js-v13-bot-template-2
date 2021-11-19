const db = require('quick.db');
const Discord = require('discord.js');

module.exports.help = {
    name: "database",
    aliases: ['db', 'database'],
    description: "Access and control the database"
}

module.exports.run = async (client, message, args) => {
  if (!client.owners.includes(message.author.id)) return;
  let term = args.slice(1).join(' ')
  let item = args[1]
  let amount = args.slice(2).join(' ')

  if (args[0] === "set") {
      db.set(`${item}`, amount)
      let balue = db.fetch(`${item}`)
      message.reply(`Successfully set a new value for \`${item}\`.\nThe new value is\`\`\`${balue}\`\`\``)
  } else if (args[0] === "delete") {
      db.delete(`${term}`)
      message.reply(`Deleted \`${term}\` successfully`)
  } else if (args[0] === "get") {
    fetched = db.fetch(`${term}`) || "Nothing found for the variable, retry?"
    message.channel.send("\`\`\`fix\n" + fetched + "\n\`\`\`")
  } else {
      message.reply("Invalid args passed, please use `set`, `get` or `delete`")
  }
}