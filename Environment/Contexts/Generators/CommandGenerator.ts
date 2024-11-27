export class CommandGenerator {
    public Execute: CommandGeneratorOptions["Execute"];
    public SlashCommandBuilder: CommandGeneratorOptions["SlashCommandBuilder"];
    public Shared: boolean;

    constructor(Options: CommandGeneratorOptions) {
        this.Execute = Options.Execute;
        this.SlashCommandBuilder = Options.SlashCommandBuilder;
        this.Shared = Options.Shared ?? false;
    }
}
