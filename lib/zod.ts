import { optional, z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string()
        .min(8, "Password must be more than 8 characters") 
        .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, "Name must be more 1 character"),
    email: z.string().email("Invalid Email"),
    password: z.string()
        .min(8, "Password must be more than 8 characters") 
        .max(32, "Password must be less than 32 characters"),
    ConfirmPassword: z.string()
        .min(8, "Password must be more than 8 characters") 
        .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.password === data.ConfirmPassword, {
    message: "Password does not match",
    path: ["ConfirmPassword"]
});

export const ForgotSchema = z.object({
    email: z.string().email("Invalid Email"),
});

export const ResetSchema = z.object({
    password: z.string()
        .min(8, "Password must be more than 8 characters") 
        .max(32, "Password must be less than 32 characters"),
    ConfirmPassword: z.string()
        .min(8, "Password must be more than 8 characters") 
        .max(32, "Password must be less than 32 characters"),
});

export const CategorySchema = z.object({
    name: z.string().min(3, "Name must be more 3 character"),
    description: z.string(),
});

export const QuizSchema = z.object({
    title: z.string().min(3, "Title must be more 3 character"),
    description: z.string().optional(),
    topic: z.string().optional(),
    categoryId: z.string(),
});

export const QuestionSchema = z.object({
    text: z.string().min(3, "Text must be more 3 character"),
    quizId: z.string(),
    difficulty: z.string().optional(),
});