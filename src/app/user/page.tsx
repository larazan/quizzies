import UserTable from '@/components/user-table'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Users",
};

const UserPage = () => {
  return (
    <div className='bg-slate-50 min-h-screen'>
        <div className='max-w-screen-md mx-auto py-10 w-full'>
            <h1 className='text-2xl font-bold'>User List</h1>
            <UserTable />
        </div>
    </div>
  )
}

export default UserPage