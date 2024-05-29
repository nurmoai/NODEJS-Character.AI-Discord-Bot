const { Client, GatewayIntentBits} = require('discord.js')
const { updateCommands } = require('./updateCommands.js')
const fs = require('fs')
const TOKEN = process.env['TOKEN']
const CLIENT_ID = process.env['CLIENT_ID']


const client = new Client({ intents: [ 
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,] });

  // TODO: Commands to change personalities and stuff
//updateCommands(TOKEN, CLIENT_ID)

// run events
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const eventName = file.substring(0, file.indexOf(".js")); 
  const event = require(`./events/${file}`);
  client.on(eventName, (...args) => event(client, ...args));
}

client.login(TOKEN);