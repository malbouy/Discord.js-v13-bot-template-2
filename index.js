//----------------------------- Modules -----------------------------
const Discord = require('discord.js');
const fs = require('fs'); 
const client = new Discord.Client({
   partials: [],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
    allowedMentions: {
        parse: [
            'users',
            'roles' // no 'everyone'
        ], 
        repliedUser: true
    }
}); 
client.aliases = new Discord.Collection();
client.commands = new Discord.Collection(); 
const keepAlive = require("./server");
// client.on("disconnect", function(event){
//     console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
// });client.on("debug", function(info){
//     console.log(`debug -> ${info}`);
// });client.on("error", function(error){
//     console.error(`client's WebSocket encountered a connection error: ${error}`);
// });client.on("reconnecting", function(){
//     console.log(`client tries to reconnect to the WebSocket`);
// });client.on("resume", function(replayed){
//     console.log(`whenever a WebSocket resumes, ${replayed} replays`);
// });client.on("warn", function(info){
//     console.log(`warn: ${info}`);
// });
client.db = require('quick.db')
const ms = require('ms')
client.owners = ["415480782509965315", '643645215495815168']

//------------------- Giveaways ------------------
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#6B5B95",
        reaction: "🎉"
    }
});
//---------------- Command files ------------------
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js")
  if (jsfiles.length <= "0") return console.log("What are you trying to do without making some commands bro? Am I some sort of a joke to work without having any command files?");

  jsfiles.forEach((file, i) => { 
    let dude = require(`./commands/${file}`); 
    client.commands.set(dude.help.name, dude); 
    console.log(`${file} Loaded!`); 
  });
});

//--------------- On Ready Function --------------
client.on('ready', async() => {
  console.log('Logged in as ' + client.user.tag)

  client.user.setActivity('Mal code for me ♥', {type: 'WATCHING'}) 
});
//----------------- Command Handler ----------------
client.on('messageCreate', async message => {
  if (message.author.bot) return; 
  if (message.channel.type === "DM") return message.reply("I don't work in DMs, use me in the server")

  let prefix = process.env.prefix
  client.prefix = prefix
  if (!message.content.startsWith(prefix)) return;
  let nasif = " "
  let charls = message.content.toLowerCase().slice(prefix.length).split(nasif)
  const command = charls[0] 
  const args = message.content.slice(prefix.length).split(nasif).slice(1)

  const walker = client.commands.get(command) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(command));
  if (!walker) {
    return; 
  }
  try {
    walker.run(client, message, args)
  } catch (error) {
    console.log(error) 
    message.channel.send('There is an error broskiiii')
  }
});
require("./server")();
client.login(process.env.token)