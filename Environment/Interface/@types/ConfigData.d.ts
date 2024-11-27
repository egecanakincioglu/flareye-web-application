interface ConfigData {
    System: {
        Locale: string;
    };

    Developer: {
        ID: string;
        Name: string;
    };

    Guild: {
        ID: string;
        Name: string;
        Channel: string;
        Owners: string[];
    };

    Signature: string;

    Presence: {
        Status: import("discord.js").PresenceStatusData;
        Messages: string[];
    };
}
