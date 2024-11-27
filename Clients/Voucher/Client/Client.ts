import { EgecanAkincioglu, GatewayIntentBits } from "@Clients";
import { CommandHandler, EventHandler, Logger, PresenceHandler, Reader, Tokens } from "@Environment";

export class Client extends EgecanAkincioglu {
    private Common = new Reader().getCommon;
    private static readonly Secret = new Tokens().getGeneral.Voucher;

    constructor() {
        super({ intents: Object.values(GatewayIntentBits).filter((item) => typeof item !== "string") });
    }

    public async VoucherManager() {
        Logger.warn(this.Common.LoadPresence);
        const EventsHandler = new EventHandler();
        const CommandsHandler = new CommandHandler();
        const PresencesHandler = new PresenceHandler(this);

        Logger.warn(this.Common.LoadEvents);
        (await EventsHandler.loadEvents())
            .addDefaultEvents()
            .registerEvents(this, { EventsHandler, CommandsHandler, PresencesHandler });

        Logger.warn(this.Common.LoadCommands);
        await CommandsHandler.commandSetup(this);

        await this.login(Client.Secret);
        Logger.warn(this.Common.TokenConnected);
    }
}
