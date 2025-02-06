export const TableSkeleton = ({columns} : {columns: { header: string; accessor: string; className?: string }[]}) => {
    return (
        <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((col) => (
              <th key={col.accessor} className={col.className}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="animate-pulse">
              <tr className="bg-white border-gray-50" >
                  <td className="hidden2 md:table-cell flex items-center gap-4 py-4">
                    <div className="h-4 w-4 rounded bg-gray-100"></div>
                  </td>
                  <td className="hidden2 md:table-cell flex items-center gap-4 py-4">
                  <div className="h-4 w-4 rounded bg-gray-100"></div>
                  </td>
                  <td className="hidden2 md:table-cell flex items-center gap-4 py-4">
                  <div className="h-4 w-4 rounded bg-gray-100"></div>
                  </td>
                  <td className="hidden2 md:table-cell flex items-center gap-4 py-4">
                  <div className="h-4 w-4 rounded bg-gray-100"></div>
                  </td>
                  <td>
                      <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-sm bg-gray-100"></div>
                      <div className="h-7 w-7 rounded-sm bg-gray-100"></div>
                      </div>
                  </td>
              </tr>
          
  
        </tbody>
      </table>
    )
}