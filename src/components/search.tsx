"use client"

import { IoSearch } from "react-icons/io5";
// import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        // console.log(term);
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className='relative w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <input 
            type='text'
            className='w-[200px] p-2 bg-transparent outline-none py-2 pl-8 text-sm outline-2 rounded-sm'
            placeholder='Search...'
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
        />
        {/* icon */}
        <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
    </div>
  )
}

export default Search