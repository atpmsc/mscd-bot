const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Creates a custom embed.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of the embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description of the embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("field1_name")
        .setDescription("Name of the first field")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("field1_value")
        .setDescription("Value of the first field")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("field2_name")
        .setDescription("Name of the second field")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("field2_value")
        .setDescription("Value of the second field")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail_url")
        .setDescription("Thumbnail Url")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("image_url").setDescription("Image Url").setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel where you want the embed to be sent")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const field1Name = interaction.options.getString("field1_name");
    const field1Value = interaction.options.getString("field1_value");
    const field2Name = interaction.options.getString("field2_name");
    const field2Value = interaction.options.getString("field2_value");
    const thumbnailUrl = interaction.options.getString("thumbnail_url");
    const image = interaction.options.getString("image_url");
    const channel = interaction.options.getChannel("channel");

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(0x18e1ee)
      .setImage(image)
      .setThumbnail(thumbnailUrl)
      .setTimestamp()
      .setAuthor({
        url: `https://github.com/atpmsc/`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(`https://github.com/atpmsc/`)
      .addFields([
        { name: field1Name, value: field1Value, inline: true },
        { name: field2Name, value: field2Value, inline: true },
      ]);

    if (channel) {
      await channel.send({ embeds: [embed] });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  },
};
