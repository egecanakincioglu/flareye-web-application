interface FileData {
    ClientManager: {
        Voucher: string;
        Supervisor: string;
        Protectives: string;
        Welcomes: string;
    };

    HandlerPaths: {
        Event: {
            Voucher: string;
            Supervisor: string;
            Protectives: string;
        };
        Command: {
            Voucher: string;
            Supervisor: string;
            Protectives: string;
        };
    };

    GlobalClientNames: {
        Voucher: string;
        Supervisor: string;
        Protectives: string;
        Welcomes: string;
    };

    CommandLines: {
        Build: {
            Command: string;
            Data: string;
        }
    };

    Service: {
        PresenceInterval: number
        PresenceQueueStart: number
    };
}
