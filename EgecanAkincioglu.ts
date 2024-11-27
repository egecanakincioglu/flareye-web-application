import { ClientManager, CLI } from "@ClientManager";
import { FileRedirector } from "@Environment";

class ClientInstance {
    private static ClientsManager = new ClientManager();
    private static CLIInstance = new CLI(this.ClientsManager);
    private static LoaderOptions = new FileRedirector();
    private static ClientNames = this.LoaderOptions.getGlobalClientNames;
    private static ClientPaths = this.LoaderOptions.getClientManager;

    constructor() {
        ClientInstance.loadClient(ClientInstance.ClientsManager);
        ClientInstance.startCLI();
    }

    private static loadClient(EA: ClientManager) {
        EA.addClient(this.ClientNames.Voucher, this.ClientPaths.Voucher);
        EA.addClient(this.ClientNames.Supervisor, this.ClientPaths.Supervisor);
        EA.addClient(this.ClientNames.Protectives, this.ClientPaths.Protectives);
        EA.addClient(this.ClientNames.Welcomes, this.ClientPaths.Welcomes);
    }

    private static startCLI() {
        ClientInstance.CLIInstance.start();
    }
}

new ClientInstance();