"use client"

import React from 'react'
import { IQuiz } from '../../../types/types'
import Image from 'next/image';
import { dots } from '@/utils/icons';
import { useRouter } from 'next/router';

interface Props {
    quiz: IQuiz;
}

const obj = {
    text: "Which organ in the human body produces insulin?",
    options: [
        { text: "Pancreas", isCorrect: true },
        { text: "Liver", isCorrect: false },
        { text: "Kidney", isCorrect: false },
        { text: "Stomach", isCorrect: false },
    ]
}

function QuizCard({ quiz }: Props) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/quiz/setup/${quiz.id}`);
    }
    
  return (
    <div 
        className='border-2 rounded-xl p-1 cursor-pointer shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform duration-300 ease-in-out'
        onClick={handleClick}
    >
        <div className='py-2 px-6 flex flex-col gap-4'>
            <div className='rounded-xl h-[16rem] py-1 bg-[#97dbff]/20'>
            <Image 
                src={
                    quiz.image ? quiz.image : `/categories/image--${quiz.title.toLowerCase().split(" ").join("-")}.svg`
                }
                alt={quiz.title}
                width={300}
                height={200}
                className='h-full rounded-xl'
            />
            </div>
            <div>
                <h2 className='text-xl font-bold'>
                    {quiz.title}
                </h2>
                <p className='text-gray-600 leading-none font-semibold'>
                    {quiz.description}
                </p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-gray-400 font-semibold text-sm flex items-center gap-2 leading-none'>
                    <span className='text-xl'>{dots}</span>
                    <span>
                        Total Question:{" "}
                        <span className='font-bold text-gray-600'>
                            {quiz.questions.length}
                        </span>
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default QuizCard