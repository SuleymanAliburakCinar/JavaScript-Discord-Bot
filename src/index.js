require("dotenv").config();
const { Client, IntentsBitField, AttachmentBuilder } = require("discord.js");
const { addPhrase, getAllPhrases } = require("./mongoDbConnection.js");
const { isEqual } = require("./utils/stringUtils.js");
const { addNonNullValueToArray } = require("./utils/generalUtils.js");
const { HELLO } = require("./constant/generalConstant.js");
const { createPhraseJSON, isValid } = require("./utils/phraseUtils.js");
const { addedPhraseEmbed } = require("./utils/discordUtils.js");
const {
  phrase_get_count,
  phrase_get_all,
} = require("./constant/generalConstant.js");
const fs = require("fs");

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

client.on("interactionCreate", async (interaction) => {
  //if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const phrase = interaction.options.get("phrase").value.toLocaleLowerCase();
    const meaning = interaction.options.get("meaning").value;
    const meaning2 = interaction.options.get("2nd-meaning");
    const meaning3 = interaction.options.get("3th-meaning");
    const meanings = [];
    addNonNullValueToArray(meanings, meaning);
    addNonNullValueToArray(meanings, meaning2?.value);
    addNonNullValueToArray(meanings, meaning3?.value);
    const phraseEntity = createPhraseJSON(phrase, meanings);
    if (isValid(phraseEntity)) {
      addPhrase(phraseEntity)
        .then(() => {
          const embed = addedPhraseEmbed(phraseEntity);
          interaction.reply({ embeds: [embed] });
        })
        .catch((err) => {
          interaction.reply(`:warning: "${err.keyValue.phrase}" is duplicate`);
        });
    } else interaction.reply("Invalid value");
  }

  if (interaction.isButton()) {
    try {
      const button = JSON.parse(interaction.customId);
      phrases = await getAllPhrases();
      if (button.command == phrase_get_count) {
        interaction.channel.messages
          .fetch(button.messageId)
          .then((msg) => msg.edit(`Phrase count is **${phrases.length}**`))
          .catch((error) => {
            console.error("Mesaj düzenlenirken bir hata oluştu:", error);
          });
      } else if (button.command == phrase_get_all) {
        fs.writeFile("phrases.txt", JSON.stringify(phrases, null, 2), (err) => {
          if (err) console.log(err);
        });
        interaction.channel.messages
          .fetch(button.messageId)
          .then((msg) => {
            const file = new AttachmentBuilder("phrases.txt");
            msg.edit({ content: "Phrase file", files: [file] });
          })
          .catch((error) => {
            console.error("Mesaj düzenlenirken bir hata oluştu:", error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(process.env.TOKEN);
