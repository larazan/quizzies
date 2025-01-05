import FormRegister from '@/components/auth/form-register'
import React from 'react'

const Register = () => {
  return (
    <div className='p-6 space-y-4'>
        <div className='text-2xl font-bold text-gray-900'>
            Create an account
            <FormRegister />
        </div>
    </div>
  )
}

export default Register