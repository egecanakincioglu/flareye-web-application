import { BotUtils, Console, Time } from "@Environment";

export class Logger {
    private static Log = new Console().getLogger;

    public static info(...messages: unknown[]): void {
        this.log(this.Log.Info, messages);
    }

    public static warn(...messages: unknown[]): void {
        this.log(this.Log.Warn, messages);
    }

    public static error(...messages: unknown[]): void {
        this.log(this.Log.Error, messages);
    }

    public static command(...messages: unknown[]): void {
        this.log(this.Log.Command, messages);
    }

    public static event(...messages: unknown[]): void {
        this.log(this.Log.Event, messages);
    }

    private static log(LogType: string, messages: unknown[]): void {
        const setTime = Time.instant();
        const botName = BotUtils.getBotName();

        console.log(`[${setTime}] [${botName}] [${LogType}]`, ...messages);
    }
}
