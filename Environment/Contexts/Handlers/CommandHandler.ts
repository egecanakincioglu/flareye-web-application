import { BotUtils, Client, CommandGenerator, Events, Logger, SlashCommandBuilder, join, readdir, Reader } from "@Environment";

export class CommandHandler {
    private Commands: CommandGenerator[] = [];
    private Language = new Reader();

    constructor(commands: CommandGenerator[] = []) {
        this.Commands = commands;
    }

    public async commandSetup(client: Client) {
        await this.loadCommands();
        this.prepareRegisterEvent(client);
    }

    public prepareRegisterEvent(egecanakincioglu: Client) {
        egecanakincioglu.once(Events.ClientReady, (client) => void this.registerCommands(client));
    }

    public async readCommands(silent = false, CommandPath = join(process.cwd(), BotUtils.getCommandHandlerPath())) {
        const EAFiles = await readdir(CommandPath, {
            withFileTypes: true,
        });
        const GrantedCommands: CommandGenerator[] = [];

        for (const EAFile of EAFiles) {
            try {
                if (EAFile.isDirectory()) {
                    const DirectoryCommands = await this.readCommands(silent, join(CommandPath, EAFile.name));
                    GrantedCommands.push(...DirectoryCommands);
                    continue;
                }

                const EACommands: unknown = await import(`file://${CommandPath}/${EAFile.name}`);

                if (
                    !EACommands ||
                    typeof EACommands !== "object" ||
                    !("default" in EACommands) ||
                    !(EACommands.default instanceof CommandGenerator)
                ) {
                    Logger.command(this.Language.getHandlers.Command.MissingData,` ${EAFile.name}`);
                    continue;
                }

                GrantedCommands.push(EACommands.default);
                Logger.command(this.Language.getHandlers.Command.SucessfulyLoaded, ` ${EAFile.name}`);
            } catch (error) {
                Logger.error(this.Language.getCommon.AnErrorOccurred, error);
                console.error(error);
            }
        }
        return GrantedCommands;
    }

    private async registerCommands(client: Client, commands = this.Commands) {
        const EAData = commands.map((CommandSender) => CommandSender.SlashCommandBuilder as SlashCommandBuilder);
        const API = client.application;

        if (!API) {
            Logger.error(this.Language.getHandlers.Command.APIConnection);
            return;
        }

        await API.commands.set(EAData);
    }

    public addCommands(...events: CommandGenerator[]): this;
    public addCommands(events: CommandGenerator[]): this;
    public addCommands(...args: unknown[]): this {
        const events = (args.length === 1 && Array.isArray(args[0]) ? args[0] : args) as CommandGenerator[];
        this.Commands.push(...events);
        return this;
    }

    public getCommands() {
        return this.Commands;
    }

    public async loadCommands() {
        this.Commands = await this.readCommands();
    }

    public sliceCommands(start: number, end?: number): CommandHandler {
        return new CommandHandler(this.Commands.slice(start, end));
    }
}
