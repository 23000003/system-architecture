import prisma from "./prisma";

export default async function SeedDatabase() {
    await prisma.post.createMany({
        data: [
            {
                title: "Lebron James",
                content: "My GOAT",
                authorId: 3,
            },
            {
                title: "MyTitle",
                content: "MyContent",
                authorId: 1,
            },
            {
                title: "WAIODWAJHOIGNJRKNAW",
                content: "CWIDAWJOIHGJIRAW",
                authorId: 2,
            }
        ],
    });
}