import { CallerFile, Console, FileRedirector, Reader } from "@Environment";
import { dirname } from "path";

export class BotUtils {
    private static Language = new Reader();
    public static pathReducer(this: void, egecanakincioglu: string | Record<string, string>): string | string[] {
        return typeof egecanakincioglu === "string" ? egecanakincioglu : Object.values(egecanakincioglu).flatMap(BotUtils.pathReducer);
    }

    private static extractBotInfo(botInfoList: [string, string][]): string {
        const Path = CallerFile.getCallerFile();
        const foundName = botInfoList.find(([, egecanakincioglu]) => Path.includes(egecanakincioglu));
        return foundName?.at(0) ?? new Console().getConsole.Prefix;
    }

    public static getBotName(): string {
        const mappedPaths = Object.entries(new FileRedirector().getClientManager).map(
            ([name, item]) => [name, dirname(item).slice("./".length)] as [string, string],
        );
        return this.extractBotInfo(mappedPaths);
    }

    public static getEventHandlerPath(): string {
        const botName = this.getBotName();
        const pathList = new FileRedirector().getHandlerPaths.Event;
        const handlerPath = Object.entries(pathList).find(([key]) => key.includes(botName));
        const path = handlerPath?.at(1);

        if (!path) throw new Error(this.Language.getCommon.BotNameNotFound);
        return path;
    }

    public static getCommandHandlerPath(): string {
        const botName = this.getBotName();
        const pathList = new FileRedirector().getHandlerPaths.Command;
        const handlerPath = Object.entries(pathList).find(([key]) => key.includes(botName));
        const path = handlerPath?.at(1);

        if (!path) throw new Error(this.Language.getCommon.BotNameNotFound);
        return path;
    }
}