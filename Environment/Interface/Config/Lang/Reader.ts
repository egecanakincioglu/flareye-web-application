import { Config, load, readFileSync } from "@Environment";

export class Reader {
    private Locale: string = new Config().getSystem.Locale;
    private ReaderPath = `./Config/Langs/Lang-${this.Locale.toUpperCase()}.yml`;
    private ReaderData: LanguageData;

    constructor() {
        this.ReaderData = this.ReaderLanguageLoader();
    }

    private ReaderLanguageLoader() {
        return load(readFileSync(this.ReaderPath, { encoding: "utf-8" })) as LanguageData;
    }

    public get getCommon(): LanguageData["Common"] {
        return this.ReaderData.Common;
    }

    public get getHandlers(): LanguageData["Handlers"] {
        return this.ReaderData.Handlers;
    }

    public get getCLI(): LanguageData["CLI"] {
        return this.ReaderData.CLI;
    }
}
