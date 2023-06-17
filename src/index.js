require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { run } = require('./mongoDbConnection.js');
const { isEqual } = require('../utils/stringUtils.js');
const { HELLO } = require('../utils/generalConstant.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online.`)
})

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;

  const messsage = msg.content.toLocaleLowerCase("tr-TR");

  if (isEqual(messsage, HELLO)) msg.reply('hello');
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hey') {
    interaction.reply('egs');
  }
});

run()

client.login(process.env.TOKEN);