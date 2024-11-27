import { ActivityType, Client, UserSizes, Reader, Config, FileRedirector } from "@Environment";
import { PresenceStatusData } from "discord.js";

export class PresenceHandler {
    private client: Client;
    private Language = new Reader();
    private Config = new Config();
    private Variables = new FileRedirector();

    constructor(client: Client) {
        this.client = client;
    }

    private setPresence(message: string) {
        const StatusType: PresenceStatusData = this.Config.getPresence.Status;
        const Users = UserSizes.getUserSizes(this.client);
        this.client.user?.setPresence({
            activities: [
                {
                    name: message.replace("%Users%", Users.toString()),
                    type: ActivityType.Listening,
                },
            ],
            status: StatusType,
        });
    }

    public loadPresence() {
        let PresenceQueue = this.Variables.getService.PresenceQueueStart;

        const UpdatePresence = () => {
            const PresenceMessages = this.Config.getPresence.Messages;
            const MainMessage = PresenceMessages[PresenceQueue];
            this.setPresence(MainMessage ?? this.Language.getCommon.PresenceMessageNotFound);
            PresenceQueue = (PresenceQueue + 1) % PresenceMessages.length;
        };
        UpdatePresence();
        setInterval(UpdatePresence, this.Variables.getService.PresenceInterval);
    }
}