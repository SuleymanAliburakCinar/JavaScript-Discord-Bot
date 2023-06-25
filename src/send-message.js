require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const {
  phrase_get_count,
  phrase_get_all,
} = require("./constant/generalConstant.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1122278700466061313");
    if (!channel) return;

    const countMessage = await channel.send(
      "Use button for get phrase's count."
    );
    const getAllMessage = await channel.send("Use button for get all phrases.");

    const commands = [
      {
        id: {
          command: phrase_get_count,
          messageId: countMessage.id,
          channelId: "1122278700466061313",
        },
        label: "Count",
      },
      {
        id: {
          command: phrase_get_all,
          messageId: getAllMessage.id,
          channelId: "1122278700466061313",
        },
        label: "Get All",
      },
    ];

    const row = new ActionRowBuilder();

    commands.forEach((command) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(JSON.stringify(command.id))
          .setLabel(command.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Phrase Pool",
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
