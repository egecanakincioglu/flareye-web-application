import { Client } from "@Environment";

export class UserSizes {
    public static getUserSizes(client: Client) {
        let EAUsers = 0;
        client.guilds.cache.forEach((egecanakincioglu) => {
            EAUsers += egecanakincioglu.memberCount;
        });
        return EAUsers;
    }
}
