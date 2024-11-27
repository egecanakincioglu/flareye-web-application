import { ChildProcess, exec } from "@ClientManager";
import { FileRedirector, Reader } from "@Environment";

export class Clients {
    private name: string;
    private path: string;
    private process: ChildProcess | null;
    private Language = new Reader();
    private Lines = new FileRedirector();

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
        this.process = null;
    }

    start(): void {
        if (this.process) {
            console.log(this.name, this.Language.getCommon.AlreadyRunning);
            return;
        }

        console.log(this.name, this.Language.getCommon.BotStarting);

        this.process = exec(`${this.Lines.getCommandLines.Build.Command} ${this.path}`);

        this.process.stdout?.on(this.Lines.getCommandLines.Build.Data, (data: string) => {
            console.log(data.trimEnd());
        });

        this.process.stderr?.on(this.Lines.getCommandLines.Build.Data, (data: string) => {
            console.log(data.trimEnd());
        });

        console.log(this.name, this.Language.getCommon.BotStarted);
    }

    stop(): void {
        if (this.process) {
            this.process.kill();
            console.log(this.name, this.Language.getCommon.BotStopped);
            this.process = null;
        } else {
            console.log(this.name, this.Language.getCommon.BotNotRunning);
        }
    }

    getName(): string {
        return this.name;
    }

    isRunning(): boolean {
        return this.process !== null;
    }
}
