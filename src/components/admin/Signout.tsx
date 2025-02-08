import React from 'react'
import { auth, signOut } from '../../../auth'
import Image from 'next/image';

const Signout = async () => {
    const session = await auth();

  return (
    <>
    {session ? (
    <div>
        <form action={async()=>{
            "use server";
            await signOut({redirectTo:"/login"})
        }}
            className='flex justify-center items-center mt-1'        
        >
            <button type='submit' className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight'>
                <Image src="/logout.png" alt="" width={20} height={20} />
                <span className="hidden lg:block">Sign Out</span>
            </button>
        </form>
    </div>
    ) : ""}
    </>
  )
}

export default Signout