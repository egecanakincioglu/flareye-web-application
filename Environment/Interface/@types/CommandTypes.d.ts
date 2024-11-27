type SlashCommandBuilders =
    | Omit<import("discord.js").SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | import("discord.js").SlashCommandBuilder
    | import("discord.js").SlashCommandOptionsOnlyBuilder
    | import("discord.js").SlashCommandSubcommandBuilder
    | import("discord.js").SlashCommandSubcommandGroupBuilder
    | import("discord.js").SlashCommandSubcommandsOnlyBuilder;

interface CommandGeneratorOptions {
    Execute(this: void, Interaction: import("discord.js").ChatInputCommandInteraction): unknown;
    SlashCommandBuilder: SlashCommandBuilders;
    Shared?: boolean;
}
