const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("today")
    .setDescription("Get today historical random info"),
  async execute(interaction, client) {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

    try {
      const response = await axios.get(url);
      const events = response.data.events;
      let id = random(events.length);

      const event = events[id];
      if (event) {
        const title = event.text || "No title available";

        const embed = new EmbedBuilder()
          .setTitle(title)
          .setURL(event.pages[0].content_urls.desktop.page)
          .setDescription(event.pages[0].extract || "No description available")
          .setImage(
            event.pages[0].originalimage.source ||
              "https://en.wikipedia.org/wiki/Wikipedia_logo#/media/File:Wikipedia-logo-v2.svg"
          )
          .setTimestamp()
          .setFooter({
            text: "Date : " + month + "/" + day + "/" + event.year,
            iconURL: interaction.client.user.displayAvatarURL() || "",
          });
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply("No event found.");
      }
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred while fetching data.");
    }
  },
};

function random(max) {
  return Math.floor(Math.random() * max);
}
