import { load, readFileSync } from "@Environment";

export class FileRedirector {
    private FileRedirectorPath = "./Config/Auth/FileRedirector.yml";
    private FileRedirectorData: FileData;

    constructor() {
        this.FileRedirectorData = this.FileSystemLoader();
    }

    private FileSystemLoader() {
        return load(readFileSync(this.FileRedirectorPath, { encoding: "utf-8" })) as FileData;
    }

    public get getClientManager(): FileData["ClientManager"] {
        return this.FileRedirectorData.ClientManager;
    }

    public get getHandlerPaths(): FileData["HandlerPaths"] {
        return this.FileRedirectorData.HandlerPaths;
    }

    public get getGlobalClientNames(): FileData["GlobalClientNames"] {
        return this.FileRedirectorData.GlobalClientNames;
    }

    public get getCommandLines(): FileData["CommandLines"] {
        return this.FileRedirectorData.CommandLines;
    }

    public get getService(): FileData["Service"] {
        return this.FileRedirectorData.Service;
    }
}
