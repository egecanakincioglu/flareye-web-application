import { Client } from "@Supervisor";
import { Logger } from "@Environment";

export class EgecanAkincioglu {
    constructor() {
        const EgecanAkincioglu = new Client();
        void EgecanAkincioglu.SupervisorManager();

        process.on("unhandledRejection", (error: Error) => {
            Logger.error(`${error.name}:`);
            console.error(error);
        });

        process.on("uncaughtException", (error: Error) => {
            Logger.error(`${error.name}:`);
            console.error(error);
        });
    }
}

new EgecanAkincioglu();
