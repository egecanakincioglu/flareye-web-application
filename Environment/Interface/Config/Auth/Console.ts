import { load, readFileSync } from "@Environment";

export class Console {
    private ConsolePath = "./Config/Auth/Console.yml";
    private ConsoleData: ConsoleData;

    constructor() {
        this.ConsoleData = this.ConsoleLoader();
    }

    private ConsoleLoader() {
        return load(readFileSync(this.ConsolePath, { encoding: "utf-8" })) as ConsoleData;
    }

    public get getLogger(): ConsoleData["Logger"] {
        return this.ConsoleData.Logger;
    }

    public get getConsole(): ConsoleData["Console"] {
        return this.ConsoleData.Console;
    }
}
