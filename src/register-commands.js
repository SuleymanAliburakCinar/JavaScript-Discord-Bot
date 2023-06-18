require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'add',
    description: 'Add the phrase and its meaning to the db',
    options: [
      {
        name: 'phrase',
        description: 'Enter the phrase',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'meaning',
        description: `Enter the phrase's meaning`,
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: '2nd-meaning',
        description: `Enter the additional phrase's meaning`,
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: '3th-meaning',
        description: `Enter the additional phrase's meaning`,
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ]
  },
];

const rest = new REST({version:'10'}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash command');
    
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID 
      ),
      { body: commands}
    );

    console.log('Slash command were registered.');
  }catch(error) {
    console.log(`There was an error: ${error}`);
  }
})();