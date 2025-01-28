"use client"

import { useFormState } from 'react-dom'
import { signInCredentials } from '../../../lib/actions'
import Link from 'next/link'
import React from 'react'
import { SubmitButton } from '../button'

const FormForgot = () => {
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
        
        <SubmitButton />
        <button type='button' className='w-full text-red-500  text-lg font-semibold border border-red-500 bg-white font-medium2 rounded-xl px-5 py-2.5 text-center uppercase hover:bg-gray-50'>
            cancel
        </button>
    </form>
  )
}

export default FormForgot