import { Clients } from "@ClientManager";
import { Reader } from "@Environment";

export class ClientManager {
    private Language = new Reader();
    private Clients: Clients[];

    constructor() {
        this.Clients = [];
    }

    addClient(name: string, path: string): void {
        const client = new Clients(name, path);
        this.Clients.push(client);
    }

    startClient(name: string): void {
        const client = this.Clients.find((egecanakincioglu) => egecanakincioglu.getName() === name);
        if (client) {
            client.start();
        } else {
            console.log(this.Language.getCommon.BotNotFound, name);
        }
    }

    stopClient(name: string): void {
        const client = this.Clients.find((egecanakincioglu) => egecanakincioglu.getName() === name);
        if (client) {
            client.stop();
        } else {
            console.log(this.Language.getCommon.BotNotFound, name);
        }
    }

    startAllClients(): void {
        this.Clients.forEach((bot) => {
            bot.start();
        });
    }

    stopAllClients(): void {
        this.Clients.forEach((bot) => {
            bot.stop();
        });
    }

    getClientStatus(): void {
        this.Clients.forEach((client) => {
            console.log(`${client.getName()} is ${client.isRunning() ? this.Language.getCommon.Running : this.Language.getCommon.Stopped}.`);
        });
    }
}
