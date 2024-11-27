import { ClientManager, readline } from "@ClientManager";
import { Reader } from "@Environment";

export class CLI {
    private clientManager: ClientManager;
    private reader: readline.Interface;
    private Language = new Reader();

    constructor(clientManager: ClientManager) {
        this.clientManager = clientManager;
        const options: readline.ReadLineOptions = {
            input: process.stdin as unknown as NodeJS.ReadableStream,
            output: process.stdout as unknown as NodeJS.WritableStream,
        };
        this.reader = readline.createInterface(options);
    }

    public start(): void {
        this.showMenu();
    }

    private showMenu(): void {
        console.log(this.Language.getCLI.Title);
        console.log(this.Language.getCLI.StartASpesificBot);
        console.log(this.Language.getCLI.StopASpesificBot);
        console.log(this.Language.getCLI.StartAllBots);
        console.log(this.Language.getCLI.StopAllBots);
        console.log(this.Language.getCLI.ShowBotsStatus);
        console.log(this.Language.getCLI.Exit);
        this.reader.question(this.Language.getCLI.QuestionPrompt, (input) => {
            this.handleUserInput(input);
        });
    }

    private handleUserInput(input: string): void {
        switch (input.trim()) {
            case "1":
                this.reader.question(this.Language.getCLI.StartBotNamePrompt, (egecanakincioglu) => {
                    this.clientManager.startClient(egecanakincioglu);
                    this.showMenu();
                });
                break;
            case "2":
                this.reader.question(this.Language.getCLI.StopBotNamePrompt, (egecanakincioglu) => {
                    this.clientManager.stopClient(egecanakincioglu);
                    this.showMenu();
                });
                break;
            case "3":
                this.clientManager.startAllClients();
                this.showMenu();
                break;
            case "4":
                this.clientManager.stopAllClients();
                this.showMenu();
                break;
            case "5":
                this.clientManager.getClientStatus();
                this.showMenu();
                break;
            case "6":
                this.reader.close();
                break;
            default:
                console.log(this.Language.getCLI.InvalidOption);
                this.showMenu();
                break;
        }
    }
}