"use server"

import { RegisterSchema, SignInSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "./prisma"
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { SecureUniqueForge } from "unique-forge";

export const signUpCredentials = async(prevState:unknown, formData: FormData) => {
    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = hashSync(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    } catch (error) {
        return {message: "Failed to register user"}
    }

    redirect("/login")
}

export const signInCredentials = async(prevState: unknown, formData:FormData) => {
    const validatedFields = SignInSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email, 
            password, 
            redirectTo: "/dashboard"
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {message: "Invalid Credentials."}            
                default:
                    return {message: "Invalid Credentials."}  
            }
        }
        throw error;
    }
}

export const resetPassword = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const forge = new SecureUniqueForge(); // url friendly decoded string
    const resetToken = forge.generate() as string;
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
  
  /*
   * Query the database to check if the user exists by email; return an error if not found.
   * Update the user's record with the reset token and expiry time for the password reset process.
   * Send a unique URL via email (using a service like Nodemailer) containing the reset token for secure access.
   */
  }
  
  export const updatePassword = async (token: string, formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
  
    /*
     * Query the database to find the user by the reset token; return an error if invalid or expired.
     * Hash the new password before saving it in the database.
     * Update the user's password, and clear the reset token and expiry time.
     * Return a success message confirming the password update.
     */
  }