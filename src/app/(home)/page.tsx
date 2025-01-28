"use client"

import HomeCard from "@/components/quiz/HomeCard";
import { useGlobalContext } from "../../../context/globalContext"
import { ICategory } from "../../../types/types";

export default function Home() {
  const { categories } = useGlobalContext();

  return (
    <div className="flex flex-col w-full py-8 px-6 gap-5">
      <h1 className="text-4xl font-bold">Quiz catalog</h1>
      <div className="mt-6 grid grid-cols-2 gap-6">
        {categories.map((category:ICategory) => (
          <HomeCard key={category.id} category={category} />
        ))}
      </div>
    </div> 
  );
}
