import { BotUtils, Client, DefaultEvents, EventGenerator, Logger, join, readdir } from "@Environment";

export class EventHandler {
    private Events: EventGenerator[] = [];

    constructor(events: EventGenerator[] = []) {
        this.Events = events;
    }

    public async eventSetup(client: Client, utils: ClientUtils) {
        await this.loadEvents();
        this.registerEvents(client, utils);
    }

    public addDefaultCommandEvent(): this {
        return this.addEvents(DefaultEvents.Command);
    }

    public addDefaultReadyEvent(): this {
        return this.addEvents(DefaultEvents.Ready);
    }

    public addDefaultEvents(): this {
        return this.addDefaultCommandEvent().addDefaultReadyEvent();
    }

    public async readEvents({ silent = false, defaults: { command = false, ready = false } = { command: false, ready: false } }: ReadEventOptions = {}) {
        const Path = join(process.cwd(), BotUtils.getEventHandlerPath());
        const GrantedEvents: EventGenerator[] = [];

        const EAFolder = join(Path);
        const EAFiles = (await readdir(EAFolder)).filter(
            (egecanakincioglu) => egecanakincioglu.endsWith(".ts") && !egecanakincioglu.endsWith(".d.ts"),
        );

        for (const EAFile of EAFiles) {
            try {
                const EAEvents: unknown = await import(`file://${join(EAFolder, EAFile)}`);

                if (
                    !EAEvents ||
                    typeof EAEvents !== "object" ||
                    !("default" in EAEvents) ||
                    !(EAEvents.default instanceof EventGenerator)
                ) {
                    Logger.info(`[Event Loader] ${EAFile} dosyasının verisi eksik.`);
                    continue;
                }

                GrantedEvents.push(EAEvents.default as EventGenerator);
                if (!silent) Logger.info(`[Event Loader] ${EAFile} başarıyla yüklendi.`);
            } catch (Error) {
                Logger.error(`Bir hata meydana geldi:`);
                console.error(Error);
            }
        }

        const defaultEventMap = [
            [command, DefaultEvents.Command],
            [ready, DefaultEvents.Ready]
        ] as const;
        
        defaultEventMap.forEach(([boolean, event]) => {
            if (boolean) GrantedEvents.push(event);
        });

        return GrantedEvents;
    }

    public async loadEvents(): Promise<this> {
        this.Events = await this.readEvents();
        return this;
    }

    public registerEvents(client: Client, utils: ClientUtils, Events = this.Events) {
        for (const MainEvent of Events) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const EARegister = (MainEvent.Once ? client.once : client.on).bind(client);
            EARegister(MainEvent.Category, (...egecanakincioglu) => void MainEvent.Execute(...egecanakincioglu, utils));
        }
    }

    public addEvents(...events: EventGenerator[]): this;
    public addEvents(events: EventGenerator[]): this;
    public addEvents(...args: unknown[]): this {
        const events = (args.length === 1 && Array.isArray(args[0]) ? args[0] : args) as EventGenerator[];
        this.Events.push(...events);
        return this;
    }

    public getEvents() {
        return this.Events;
    }

    public sliceEvents(start: number, end?: number): EventHandler {
        return new EventHandler(this.Events.slice(start, end));
    }
}
