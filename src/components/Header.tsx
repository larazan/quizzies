// "use client"

import { chart, home } from '@/utils/icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { auth, signOut } from '../../auth'

async function Header() {
    const session = await auth();
    // const pathname = usePathname();

    // const menu = [
    //     {
    //         name: 'Home',
    //         icon: home,
    //         link: "/",
    //     },
    //     {
    //         name: 'My Stats',
    //         icon: chart,
    //         link: "/stats",
    //     },
    // ]

  return (
    <header className="min-h-[6vh] border-b-2 flex items-center w-full bg-white">
        <nav className="w-full max-w-4xl mx-auto p-4 flex items-center justify-between bg-white">
            <Link href={"/"} className="flex items-center gap-2">
                <Image src={"/icon--logo-lg.png"} alt='logo' width={50} height={50} />
                <h1 className='text-3xl font-bold text-blue-400'>Qizz</h1>
            </Link>
            
            <div className='flex items-center gap-3'>

                <ul className='hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800'>
                    <li>
                        <Link href={"/"} >Home</Link>
                    </li>
                    
                    {session && (
                        <>
                            <li>
                                <Link href={"/stats"} >My Stats</Link>
                            </li>
                            {session?.user.role === "admin" ? (
                                <li>
                                    <Link href={"/users"} >Users</Link>
                                </li>
                            ) : null }
                        </>
                    )}
                    
                    
                {/* {menu.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.link}
                            className={`py-1 px-6 flex items-center gap-2 text-lg leading-none text-gray-700 rounded-lg
                                ${
                                    pathname === item.link
                                    ? "bg-blue-500/20 text-blue-400 border-2 border-blue-400"
                                    : ""
                                }
                            `}
                        >
                            <span className='text-2xl text-blue-400'>{item.icon}</span>
                            <span 
                                className={`font-bold uppercase
                                ${pathname === item.link ? "text-blue-400" : "text-gray-400"}
                                `}
                            >{item.name}</span>
                        </Link>
                        
                    </li>
                ))} */}
            </ul>

            {session && (
                <div className='flex gap-3 items-center'>
                    <div className='flex flex-col justify-center -space-y-1'>
                        <span className='font-semibold text-gray-600 text-right capitalize'>{session.user.name}</span>
                        <span className='font-xs text-gray-400 text-right capitalize'>{session.user.role}</span>
                    </div>
                    <button type='button' className='text-sm ring-2 bg-gray-100 rounded-full'>
                        <Image src={session?.user.image || "/avatar.svg"} alt='avatar' width={64} height={64} className='w-8 h-8 rounded-full' />
                    </button>
                </div>
            )}
            
            {session ? (
                <form action={async()=>{
                    "use server";
                    await signOut({redirectTo:"/login"})
                }}>
                    <button type='submit' className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                        Sign Out
                    </button>
                </form>
            ):(
                <Link href={"/login"} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign In</Link>
            )}
            </div>
        </nav>
    </header>
  )
}

export default Header