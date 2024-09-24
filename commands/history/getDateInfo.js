const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("today")
    .setDescription("Get today historical random info"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
