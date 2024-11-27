import { ChatInputCommandInteraction, CommandGenerator, SlashCommandBuilder } from "@Environment";

export default new CommandGenerator({
    SlashCommandBuilder: new SlashCommandBuilder().setName("ping").setDescription("deneme"),
    Execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply("pong");
    },
});
