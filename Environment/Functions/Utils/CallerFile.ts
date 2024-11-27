import { Reader } from "@Environment";

export class CallerFile {
    private static Language = new Reader();
    public static getCallerFile(this: void): string {
        const Object = { stack: "" };

        Error.captureStackTrace(Object, CallerFile.getCallerFile);

        const Stack = Object.stack
            .split("\n")
            .slice(1)
            .filter(
                (string) =>
                    !string.includes("node_modules") &&
                    !string.includes("node:internal") &&
                    !string.includes("node:events"),
            );

        const CallerLine = Stack.map((string) => string.trim()).at(-1);
        const Match = CallerLine?.match(/\((.*):\d+:\d+\)$/)?.at(1);

        if (!Match) {
            const errorMessage = [
                CallerFile.Language.getCommon.Caller,
                Stack.join("\n"),
                "-".repeat(Math.max(...Stack.map((string) => string.length)) + 15),
            ].join("\n");
            throw new Error(errorMessage);
        }

        return Match;
    }
}
