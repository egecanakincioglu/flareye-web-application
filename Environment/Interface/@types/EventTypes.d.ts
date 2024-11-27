interface EventGeneratorOptions<Category extends keyof ClientEvents> {
    Execute(this: void, ...egecanakincioglu: [...import("discord.js").ClientEvents[Category], utils: ClientUtils]): unknown;
    Category: Category;
    Once?: boolean;
    Shared?: boolean;
}
