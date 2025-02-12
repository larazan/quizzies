"use client"

import { useFormState } from 'react-dom'
import { signInCredentials } from '../../../lib/actions'
import Link from 'next/link'
import React from 'react'
import { LoginButton } from '../button'

const FormLogin = () => {
    const [state, formAction] = useFormState(signInCredentials, null);
  return (
    <form action={formAction} className='pt-4 space-y-4'>
        {state?.message ? (
            <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100' role='alert'>
                <span>{state?.message}</span>
            </div>
        ) : null}
        
        <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
            <input type='text' name='email' placeholder='john.doe@mail.com' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5' />
            <div aria-live='polite' aria-atomic='true'>
               <span className='text-sm text-red-500 mt-2'>{state?.error?.email}</span> 
            </div>
        </div>
        <div>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
            <input type='password' name='password' placeholder='********' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5' />
            <div aria-live='polite' aria-atomic='true'>
               <span className='text-sm text-red-500 mt-2'>{state?.error?.password}</span> 
            </div>
        </div>
        <div className='flex w-full justify-end'>
            <Link href={"/forgot"}><span className='text-sm font-medium text-gray-500 hover:text-gray-800'>Forgot password?</span></Link>
        </div>
        <LoginButton />
        
        <div>
            <p className='text-sm font-light text-gray-500'>Dont have an account yet?
                <Link href={"/register"}><span className='font-medium pl-1 text-blue-600 hover:text-blue-700'>Sign up here</span></Link>
            </p>
        </div>
        
    </form>
  )
}

export default FormLogin