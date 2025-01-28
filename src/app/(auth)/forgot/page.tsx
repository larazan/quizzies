import FormForgot from '@/components/auth/form-forgot'
import React from 'react'

const Forgot = () => {
  return (
    <div className='p-6 space-y-4'>
        <div className='text-2xl font-bold text-gray-900'>
            <div>Forgot password?</div>
            <span></span>
            <FormForgot />
            
        </div>
    </div>
  )
}

export default Forgot