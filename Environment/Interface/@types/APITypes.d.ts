interface ClientUtils {
    CommandsHandler: import("@Environment").CommandHandler;
    EventsHandler: import("@Environment").EventHandler;
    PresencesHandler: import("@Environment").PresenceHandler;
}

interface ReadEventOptions {
    silent?: boolean;
    defaults?: {
        command?: boolean;
        ready?: boolean;
    }
}