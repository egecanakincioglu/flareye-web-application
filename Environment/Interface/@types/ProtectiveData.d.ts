interface ProtectiveData {
    TaskDelay: number;
    GiveRoleDelay: number;

    Limits: {
        Ban: number;
        Jail: number;
        Warn: number;
        ChatMute: number;
        Voicemute: number;
        RoleCreate: number;
        ChannelCreate: number;
        Reklam: number;
        Etiket: number;
    };

    Blocking: {
        Kufur: boolean;
        Spam: boolean;
        Caps: boolean;
        Reklam: boolean;
    };
    x;
}
