import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET(req:NextRequest) {
    try {
        const categories = await prisma.category.findMany({});

        return NextResponse.json(categories);
    } catch (error) {
        console.log("There was an error getting categories: ", error);
        return NextResponse.json(
            { error: "There was an error getting categories" },
            {
                status: 500,
            }
        );
    }
}