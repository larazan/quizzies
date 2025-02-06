import React from 'react'
import Image from 'next/image'
import FormModal from '@/components/admin/FormModal'
import CategoryTable from '@/components/category-table'
import Search from '@/components/search';
import { getCategoryPages } from '@/libs/data';
import Pagination from '@/components/pagination';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/skeleton';

const columns = [
    {
      header: "#",
      accessor: "#",
      className: "hidden md:table-cell",
    },
    {
      header: "Name",
      accessor: "name",
      className: "hidden md:table-cell",
    },
    {
      header: "Image",
      accessor: "image",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

const CategoryPage = async ({
    searchParams
}: {
    searchParams:{
        query:string,
        page:string
    }
}) => {

    const query = searchParams.query || "";
    const currentPage = Number(searchParams.page) || 1;
    const totalPages = await getCategoryPages(query);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Category</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* search */}
          <Search />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
              <FormModal table="student" type="create"/>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Suspense key={query + currentPage} fallback={<TableSkeleton columns={columns} />}>
        <CategoryTable columns={columns} query={query} currentPage={currentPage} />
      </Suspense>
      {/* PAGINATION */}
      <div className='flex justify-center mt-4'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}

export default CategoryPage