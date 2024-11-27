import { ClientEvents } from "@Environment";

export class EventGenerator<Category extends keyof ClientEvents = keyof ClientEvents> {
    public Category: Category;
    public Execute: EventGeneratorOptions<Category>["Execute"];
    public Once: boolean;
    public Shared: boolean;

    constructor(Options: EventGeneratorOptions<Category>) {
        this.Execute = Options.Execute;
        this.Category = Options.Category;
        this.Once = Options.Once ?? false;
        this.Shared = Options.Shared ?? false;
    }
}
