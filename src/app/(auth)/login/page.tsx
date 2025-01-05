import FormLogin from '@/components/auth/form-login'
import React from 'react'

const Login = () => {
  return (
    <div className='p-6 space-y-4'>
        <div className='text-2xl font-bold text-gray-900'>
            Sign in to your account
            <FormLogin />
        </div>
    </div>
  )
}

export default Login