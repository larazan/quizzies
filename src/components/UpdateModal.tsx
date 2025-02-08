"use client"

import React, { useState } from 'react'
import { mutate } from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Category } from "@prisma/client";
import { CategorySchema } from "../../lib/zod";
import CategoryForm from "./category-form";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiX } from "react-icons/hi";

export type categorySchema = z.infer<typeof CategorySchema>;

const UpdateModal = ({ category }: { category: Category }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [modal, setModal] = useState(false);

    const onSubmit = async (data: categorySchema) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/categories", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, id: category.id }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.message || "Failed to update category"
                );
            }

            setErrorMessage("");
            setModal(false);
            mutate("/api/todos");
        } catch (error) {
            console.error("Error updating todo:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred";
            setErrorMessage(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };


  return (
    <>
    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600">
        <HiOutlinePencilAlt className="w-5 h-5 text-white" />
    </button>
    </>
  )
}

export default UpdateModal