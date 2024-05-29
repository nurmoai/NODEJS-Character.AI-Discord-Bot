module.exports = async (client, interaction) => {

if (!interaction.isChatInputCommand()) return;

if (interaction.commandName === 'ping') {
  await interaction.reply('Pong!');
}
}