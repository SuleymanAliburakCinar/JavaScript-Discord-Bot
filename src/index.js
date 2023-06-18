require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { addPhrase } = require("./mongoDbConnection.js");
const { isEqual } = require("./utils/stringUtils.js");
const { addNonNullValueToArray } = require("./utils/generalUtils.js");
const { HELLO } = require("./constant/generalConstant.js");
const { createPhraseJSON, isValid } = require("./utils/phraseUtils.js");
const { addedPhraseEmbed } = require("./utils/discordUtils.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  const messsage = msg.content.toLocaleLowerCase("tr-TR");

  if (isEqual(messsage, HELLO)) msg.reply("hello");
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const phrase = interaction.options.get("phrase").value;
    const meaning = interaction.options.get("meaning").value;
    const meaning2 = interaction.options.get("2nd-meaning");
    const meaning3 = interaction.options.get("3th-meaning");
    const meanings = [];
    addNonNullValueToArray(meanings, meaning);
    addNonNullValueToArray(meanings, meaning2?.value);
    addNonNullValueToArray(meanings, meaning3?.value);
    const phraseEntity = createPhraseJSON(phrase, meanings);
    if (isValid(phraseEntity)) {
      addPhrase(phraseEntity);
      const embed = addedPhraseEmbed(phraseEntity);
      interaction.reply({ embeds: [embed] });
    } else interaction.reply("Invalid value");
  }
});

client.login(process.env.TOKEN);
