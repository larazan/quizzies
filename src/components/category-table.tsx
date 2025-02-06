import React from 'react'
import { getCategories } from '@/libs/data'
import { formatDate } from '@/libs/utils';
import FormModal from './admin/FormModal';


const CategoryTable = async ({
    columns,
    query,
    currentPage
}: {
    columns: { header: string; accessor: string; className?: string }[],
    query: string,
    currentPage: number
}) => {
    const categories = await getCategories(query, currentPage);

  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.map((item:any, index) => (
            <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
            >
                <td className="hidden2 md:table-cell flex items-center gap-4 py-4">{index + 1}</td>
                <td className="hidden2 md:table-cell flex items-center gap-4 py-4">{item.name}</td>
                <td className="hidden2 md:table-cell flex items-center gap-4 py-4">{item.image}</td>
                <td className="hidden2 md:table-cell flex items-center gap-4 py-4">{formatDate(item.createdAt.toString())}</td>
                <td>
                    <div className="flex items-center gap-2">
                    
                        <FormModal table="parent" type="update" data={item} />
                        <FormModal table="parent" type="delete" id={item.id} />
                    
                    </div>
                </td>
            </tr>
        ))}

      </tbody>
    </table>
  )
}

export default CategoryTable