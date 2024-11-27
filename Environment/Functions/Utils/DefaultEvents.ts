import { EventGenerator, Events, Time } from "@Environment";

export class DefaultEvents {
    public static Ready = new EventGenerator({
        Category: Events.ClientReady,
        Once: true,
        Shared: true,
        async Execute(interaction, { PresencesHandler }) {
            interaction.user.setPresence({
                activities: [{ name: "🔥 Developed by EGECAN AKINCIOGLU" }],
                status: "dnd",
            });
            await Time.Countdown(8000);
            PresencesHandler.loadPresence();
        },
    });

    public static Command = new EventGenerator({
        Category: Events.InteractionCreate,
        Shared: true,
        Execute(interaction, { CommandsHandler }) {
            if (!interaction.isChatInputCommand()) return;

            const EACommands = CommandsHandler.getCommands().find(
                (egecanakincioglu) => egecanakincioglu.SlashCommandBuilder.name === interaction.commandName,
            );

            if (!EACommands) return;

            return EACommands.Execute(interaction);
        },
    });
}
