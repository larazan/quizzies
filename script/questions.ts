const questions = require("../data/csQuestions.js")

let questionsPrisma:any

async function seedQuestions() {
    const { PrismaClient } = require("@prisma/client");

    questionsPrisma = new PrismaClient()

    console.log("Seeding question")

    for (const question of questions) {
        const createdQuestion = await questionsPrisma.question.create({
            data: {
                text: question.text,
                quizId: "cm5qk7pqn0001u0xotquhk2a1",
                options: {
                    create: question.options,
                },
                difficulty: question.difficulty,
            },
        });

        console.log(`created question: ${createdQuestion.text}`)
    }
    console.log("Seeding questions completed.")
}

seedQuestions().catch((e) => {
    console.log("Error seeding questions: ", e)
}).finally(async () => {
    await questionsPrisma.$disconnect();
});


// npx ts-node script/questions.ts

