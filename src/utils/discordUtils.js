const { EmbedBuilder } = require("discord.js");

function addedPhraseEmbed(phraseEntity) {
  console.log(phraseEntity);
  const embed = new EmbedBuilder()
    .setTitle(phraseEntity?.phrase)
    .setColor("Blue")
    .addFields(
      phraseEntity?.meanings.map((element) => {
        return { name: "meaning", value: element, inline: false };
      })
    );
  return embed;
}

module.exports = { addedPhraseEmbed };
