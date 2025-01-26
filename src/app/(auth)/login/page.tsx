import FormLogin from '@/components/auth/form-login'
import { GoogleButton } from '@/components/auth/social-button'
import React from 'react'

const Login = () => {
  return (
    <div className='p-6 space-y-4'>
        <div className='text-2xl font-bold text-gray-900'>
            Sign in to your account
            <FormLogin />
            <div className='my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300'>
              <p className='mx-4 mb-0 text-sm text-center font-semibold text-gray-600'>Or</p>
            </div>
            <GoogleButton />
        </div>
    </div>
  )
}

export default Login