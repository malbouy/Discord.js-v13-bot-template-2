const Discord = require('discord.js')
const ms = require('ms')
const { inspect } = require('util')
const owners = ["415480782509965315", '643645215495815168', "739530120452374699"]

module.exports.help = {
  name: "evaluate",
  aliases: ['eval'],
  description: 'Evaluates a piece of code'
}

module.exports.run = async (client, message) => {
  if (!owners.includes(message.author.id)) return;
  args = message.content.slice(client.prefix.length).split(' ').splice(1)
  if (message.content.includes("client.token")) return;
  let evaled;
  try {
    evaled = await eval(args.join(' '));
    message.channel.send(`\`\`\`js\n${inspect(evaled)}\`\`\``);
    //console.log(inspect(evaled));
  }
  catch (error) {
    message.reply('There was an error during evaluation. Please try again```js'+error+"```");
  }
}