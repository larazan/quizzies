import React from 'react'
import { getUsers } from '../../lib/data'
import { formatDate } from '@/libs/utils';

const UserTable = async () => {
    const users = await getUsers();
    if(!users?.length) return <h1 className='text-2xl'>No User Found</h1>

  return (
    <table className='w-full bg-white mt-3'>
        <thead className='border-b border-gray-100'>
            <tr>
                <th className='py-3 px-6 text-left text-sm'>Name</th>
                <th className='py-3 px-6 text-left text-sm'>Email</th>
                <th className='py-3 px-6 text-left text-sm'>Role</th>
                <th className='py-3 px-6 text-left text-sm'>Created at</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user,i) => (
                <tr key={i}>
                    <td className='px-6 py-3'>{user.name}</td>
                    <td className='px-6 py-3'>{user.email}</td>
                    <td className='px-6 py-3'>{user.role}</td>
                    <td className='px-6 py-3'>{formatDate(user.createdAt.toString())}</td>
                </tr>
            ))}
            
        </tbody>
    </table>
  )
}

export default UserTable