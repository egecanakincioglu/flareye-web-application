import { load, readFileSync } from "@Environment";

export class Tokens {
    private TokensPath = "./Config/Private/Tokens.yml";
    private TokensData: TokenData;

    constructor() {
        this.TokensData = this.TokensLoader();
    }

    private TokensLoader(): TokenData {
        const data = readFileSync(this.TokensPath, { encoding: "utf-8" });
        return load(data) as TokenData;
    }

    public get getGeneral(): TokenData["General"] {
        return this.TokensData.General;
    }

    public get getWelcome(): TokenData["Welcome"] {
        return this.TokensData.Welcome;
    }
}
