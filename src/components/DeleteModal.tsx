"use client"

import React, { useState } from 'react'
import { mutate } from "swr";
import { HiOutlineTrash } from "react-icons/hi";
import { HiX } from "react-icons/hi";

const DeleteModal = ({ id }: { id: string }) => {
    const [modal, setModal] = useState(false);

    const handleDelete = async () => {
        const response = await fetch(`/api/categories?id=${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Todo deleted successfully");
            mutate("/api/category");
        } else {
            console.error("Failed to delete category");
        }
    };

    const handleChange = () => {
        setModal(!modal);
    } 

  return (
    <>
      <button
        onClick={handleChange}
        className="w-7 h-7 flex items-center justify-center rounded-full text-red-500 bg-red-500 hover:text-red-700 hover:bg-red-600"
      >
        <HiOutlineTrash className='w-5 h-5 text-white' />
      </button>
{modal && (
      <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
          <form action="" className="p-4 flex flex-col gap-4" onClick={handleDelete}>
            <span className="text-center font-medium">
              All data will be lost. Are you sure you want to delete this
              parent?
            </span>
            <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
              Delete
            </button>
          </form>
          <div className="absolute top-4 right-4 cursor-pointer" onClick={handleChange}>
            <HiX className='w-6 h-6 text-gray-600' />

          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default DeleteModal