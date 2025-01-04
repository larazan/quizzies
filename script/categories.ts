let categsPrisma: any;

async function addCategories() {
    const { PrismaClient } = require("@prisma/client");

    categsPrisma = new PrismaClient();

    const categories = [
        {
            name: "science",
            description: "Science is the pursuit and application of knowledge and understanding of the",
        },
        {
            name: "Technology",
            description: "Dive into the latest technological advancements",
        },
        {
            name: "Programming",
            description: "Learn about coding and software development",
        },

        
    ];

    console.log("Adding categories..");

    for (const category of categories) {
        await categsPrisma.category.create({
            data: category,
        })
    }
}

addCategories()
.catch((e) => {
    console.log("Error Adding Categories: ", e);
})
.finally(async () => {
    await categsPrisma.$disconnect();
})