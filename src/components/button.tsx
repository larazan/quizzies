"use client"

import { useFormStatus } from "react-dom"

export const RegisterButton = () => {
    const { pending } = useFormStatus();

    return (
        <button type='submit' disabled={pending} className='w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-blue-800'>
            {pending ? "Registering..." : "Register"}
        </button>
    )
}

export const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <button type='submit' disabled={pending} className='w-full text-white text-lg font-semibold bg-blue-700 font-medium2 rounded-xl px-5 py-2.5 text-center uppercase hover:bg-blue-800'>
            {pending ? "Authenticating..." : "Sign In"}
        </button>
    )
}

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button type='submit' disabled={pending} className='w-full text-white text-lg font-semibold bg-gray-800 font-medium2 rounded-xl px-5 py-2.5 text-center uppercase hover:bg-gray-900'>
            {pending ? "Authenticating..." : "Submit"}
        </button>
    )
}