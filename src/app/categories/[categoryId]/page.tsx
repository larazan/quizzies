import React from 'react'
import prisma from '@/utils/connect';
import { IQuiz } from '../../../../types/types';
import QuizCard from '@/components/quiz/QuizCard';

async function page({ params }: any) {
  const { categoryId } = await params;
  const { userId } = await params;

  if (!categoryId) {
    return null;
  }

  const quizzes = await prisma.quiz.findMany({
    where: { categoryId },
    include: {
      questions: {
        select: {
          id: true,
          text: true,
          difficulty: true,
          options: {
            select: {
              id: true,
              text: true,
              isCorrect: true,
            }
          }
        }
      }
    },
    orderBy: {
      id: "asc",
    },
  })

  console.log("quizzes: ", quizzes);

  return (
    <div>
      <h1 className='mb-6 text-4xl font-bold'>All Quizzes</h1>

      {quizzes.length > 0 ? (
        <div className='mb-8 grid grid-cols-[repeat(auto-fit, minmax(400px,1fr))] gap-6'>
          {quizzes.map((quiz: any) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
          
      ): (
        <h1 className='text-2xl text-center mt-4'>Not found</h1>
      )}
    </div>
  )
}

export default page