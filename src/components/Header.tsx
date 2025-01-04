"use client"

import { chart, home } from '@/utils/icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const pathname = usePathname();

    const menu = [
        {
            name: 'Home',
            icon: home,
            link: "/",
        },
        {
            name: 'My Stats',
            icon: chart,
            link: "/stats",
        },
    ]
  return (
    <header className="min-h-[8vh] px-[10rem] xl:px-[15rem] border-b-2 flex items-center">
        <nav className="flex-1 flex items-center justify-between">
            <Link href={"/"} className="flex items-center gap-2">
                <Image src={""} alt='logo' width={50} height={50} />
                <h1 className='text-3xl font-bold text-blue-400'>Qizz</h1>
            </Link>
            
            <ul className='flex items-center gap-8'>
                {menu.map((item, index) => (
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
                ))}
            </ul>

            
        </nav>
    </header>
  )
}

export default Header