import prisma from "./prisma";

export default async function SeedDatabase() {
    await prisma.user.createMany({
        data: [
            {
                username: "Lebron James",
                password: "The Goat 123",
            },
            {
                username: "Godwin",
                password: "cisco123",
            },
            {
                username: "LukeKanding",
                password: "kanding123",
            }
        ],
    });
}