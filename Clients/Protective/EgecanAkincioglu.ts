import { CommandHandler, EventHandler, Logger, PresenceHandler, Reader, Tokens } from "@Environment";

import { Client } from "@Protective";

export class EgecanAkincioglu {
    private Common = new Reader().getCommon;

    constructor() {
        void this.LoadClients();
    }

    private async LoadClients(): Promise<void> {
        const tokens = new Tokens().getGeneral.Protectives;

        const EventsHandler = new EventHandler();
        const CommandsHandler = new CommandHandler();

        Logger.warn(this.Common.LoadEvents);
        const events = await EventsHandler.readEvents({ silent: true, defaults: { command: true, ready: true } });

        Logger.warn(this.Common.LoadCommands);
        const commands = await CommandsHandler.readCommands(true);

        const sharedCommands = commands.filter((command) => command.Shared);
        const sharedEvents = events.filter((event) => event.Shared);

        const notSharedCommands = commands.filter((command) => !command.Shared);
        const notSharedEvents = events.filter((event) => !event.Shared);

        const slicedCommandSize = Math.floor(notSharedCommands.length / tokens.length);
        const slicedEventSize = Math.floor(notSharedEvents.length / tokens.length);

        const tokenMap = tokens.map((token, index) => ({
            token,
            EventsHandler: EventsHandler.sliceEvents(slicedEventSize * index, slicedEventSize * (index + 1)).addEvents(sharedEvents),
            commandHandler: CommandsHandler.sliceCommands(slicedCommandSize * index, slicedCommandSize * (index + 1)).addCommands(sharedCommands),
        }));

        tokenMap.forEach(({ token, EventsHandler, commandHandler: CommandsHandler }) => {
            const client = new Client(token);
            const PresencesHandler = new PresenceHandler(client);
            void client.ProtectivesManager({ EventsHandler, CommandsHandler, PresencesHandler });
        });

        process.on("unhandledRejection", (error: Error) => {
            Logger.error(`${error.name}:`);
            console.error(error);
        });

        process.on("uncaughtException", (error: Error) => {
            Logger.error(`${error.name}:`);
            console.error(error);
        });
    }
}

new EgecanAkincioglu();
