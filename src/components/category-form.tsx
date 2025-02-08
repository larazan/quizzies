"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../../lib/zod";
import { z } from "zod";
import Image from "next/image";

export type categorySchema = z.infer<typeof CategorySchema>;

interface TodoFormProps {
    defaultValues: categorySchema;
    onSubmit: (data: categorySchema) => Promise<void>;
    submitButtonText: string;
    isSubmitting: boolean;
}

const CategoryForm = ({
    defaultValues,
    onSubmit,
    submitButtonText,
    isSubmitting,
}: TodoFormProps) => {

    const form = useForm<categorySchema>({
        resolver: zodResolver(CategorySchema),
        defaultValues,
    });

  return (
    <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-xl font-semibold">Create a new teacher</h1>
          <span className="text-xs text-gray-400 font-medium">
            Authentication Information
          </span>
          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Username</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="text"
                name="username"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Email</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="text"
                name="email"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Password</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="password"
                name="password"
              />
            </div>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            Personal Information
          </span>
          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">First Name</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="text"
                name="firstName"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Last Name</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="text"
                name="lastName"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Phone</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="text"
                name="phone"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Address</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="text"
                name="address"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Blood Type</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="text"
                name="bloodType"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Birthday</label>
              <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                type="date"
                name="birthday"
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Sex</label>
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                name="sex"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
              <label
                className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                htmlFor="img"
              >
                <Image src={"/upload.png"} alt="" width={28} height={28} />
                <span>Upload a photo</span>
              </label>
              <input id="img" className="hidden" type="file" name="img" />
            </div>
          </div>
          <button className="bg-blue-400 text-white p-2 rounded-md">
            Create
          </button>
        </form>
  )
}

export default CategoryForm