const { PrismaClient } = require("@prisma/client");

let quizzesPrisma: any;

const quizzes = [
    {
        title: "Computer Science Basics",
        description: "A quiz about fndamental computer science concepts.",
        categoryId: "cm5l09cps0001u0ngffk10suz",
    },
    {
        title: "Programming Fundamentals",
        description: "Test your knowledge of basic programming concept.",
        categoryId: "cm5l09cw30002u0ngxkfthiq3",
    },
    {
        title: "Data Structures",
        description: "Assess your understanding of data structures.",
        categoryId: "cm5l09cw30002u0ngxkfthiq3",
    },
    {
        title: "Physics",
        description: "Test your knowledge of physics.",
        categoryId: "cm5l09bmb0000u0ngs50s9wqy",
    },
    {
        title: "Biology",
        description: "Test your knowledge of biology.",
        categoryId: "cm5l09bmb0000u0ngs50s9wqy",
    },
    {
        title: "Chemistry",
        description: "Test your knowledge of chemistry.",
        categoryId: "cm5l09bmb0000u0ngs50s9wqy",
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

// cm5l09bmb0000u0ngs50s9wqy    science
// cm5l09cps0001u0ngffk10suz    tech
// cm5l09cw30002u0ngxkfthiq3    prog