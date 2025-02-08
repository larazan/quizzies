"use client"

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategorySchema } from "../../lib/zod";
import { mutate } from "swr";
import CategoryForm from "./category-form";
import { HiOutlinePlus } from "react-icons/hi";
import { HiX } from "react-icons/hi";


export type categorySchema = z.infer<typeof CategorySchema>;

const AddModal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [modal, setModal] = useState(false);

    const form = useForm<categorySchema>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (data: categorySchema) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.message || "Failed to create category"
                );
            }
            form.reset();
            setModal(false);
            mutate("/api/category");
            setErrorMessage("");
        } catch (error) {
            console.error("Error creating category:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred";
            setErrorMessage(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = () => {
        setModal(!modal);
    } 

  return (
    <>
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600" onClick={handleChange}>
        <HiOutlinePlus className="w-6 h-6 text-white" />
    </button>
    {modal && (
    <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
        <CategoryForm 
            defaultValues={{
                name: "",
                description: "",
            }}
            onSubmit={onSubmit}
            submitButtonText="Create"
            isSubmitting={isSubmitting}
        />
        <div className="absolute top-4 right-4 cursor-pointer" onClick={handleChange}>
          <HiX className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default AddModal;
