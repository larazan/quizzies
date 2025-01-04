const { PrismaClient } = require("@prisma/client");

let quizzesPrisma: any;

const quizzes = [
    {
        title: "Computer Science Basics",
        description: "A quiz about fndamental computer science concepts.",
        categoryId: "1",
    },
    {
        title: "Programming Fundamentals",
        description: "Test your knowledge of basic programming concept.",
        categoryId: "1",
    },
    {
        title: "Data Structures",
        description: "Assess your understanding of data structures.",
        categoryId: "1",
    },
    {
        title: "Physics",
        description: "Test your knowledge of physics.",
        categoryId: "1",
    },
    {
        title: "Biology",
        description: "Test your knowledge of biology.",
        categoryId: "1",
    },
    {
        title: "Chemistry",
        description: "Test your knowledge of chemistry.",
        categoryId: "1",
    },
]

async function seedQuizzes() {
    quizzesPrisma = new PrismaClient();

    console.log("Seeding quizzes...")

    for (const quiz of quizzes) {
        const createdQuiz = await quizzesPrisma.quiz.create({
            data: quiz,
        })
        
        console.log("Created quiz: ", `${createdQuiz.title}`)
    }
    console.log("Seeding quizzes completed.")
}

seedQuizzes().catch((e) => {
    console.log("Error seeding quizzes: ", e)
}).finally(async () => {
    await quizzesPrisma.$disconnect();
});

// npx ts-node script/quizzes.ts