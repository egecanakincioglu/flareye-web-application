import { EgecanAkincioglu, GatewayIntentBits } from "@Clients";
import { Logger, Reader } from "@Environment";

export class Client extends EgecanAkincioglu {
    private Common = new Reader().getCommon;

    constructor(token: string) {
        super({ intents: Object.values(GatewayIntentBits).filter((item) => typeof item !== "string") });
        this.token = token;
    }

    public async ProtectivesManager(utils: ClientUtils) {
        const { EventsHandler, CommandsHandler } = utils;
        Logger.warn(this.Common.LoadPresence);

        EventsHandler.registerEvents(this, utils);
        CommandsHandler.prepareRegisterEvent(this);

        await this.login();
        Logger.warn(this.Common.TokenConnected);
    }
}
