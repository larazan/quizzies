import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { CategorySchema } from "../../../../lib/zod";
import { Category } from "@prisma/client";

// GET
export async function GET(req:NextRequest) {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

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

// POST
export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const result = CategorySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ message: 'Invalid input', errors: result.error.errors }, { status: 400 });
        }

        const categoryData = result.data;

        const newData = await prisma.category.create({
            data: {
                name: categoryData.name,
                description: categoryData.description || '',
            },
        });

        return NextResponse.json(newData, { status: 201 });
    } catch (error) {
        console.error('Error adding category:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

// PUT
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...rest } = body;
        const result = CategorySchema.safeParse(rest);

        if (!result.success) {
            return NextResponse.json({ message: 'Invalid input', errors: result.error.errors }, { status: 400 });
        }

        const categoryData = result.data as Category;

        if (!id) {
            return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: categoryData.name,
                description: categoryData.description,
            },
        });

        if (!updatedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error('Error updating Category:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
        }

        const deletedCategory = await prisma.category.delete({
            where: { id },
        });

        if (!deletedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}