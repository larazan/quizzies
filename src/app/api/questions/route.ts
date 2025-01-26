//import next request and response
import { NextResponse } from "next/server";

//import prisma client
import prisma from "../../../utils/connect";

export async function GET() {
  //get all questions
  const questions = await prisma.question.findMany();

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "List Data Question",
      data: questions,
    },
    {
      status: 200,
    }
  );
}