import React from 'react'
import { FcGoogle } from 'react-icons/fc'

function OAuth() {
    return (
        <button type='button'
            className='w-full justify-center px-4 py-3 text-xl text-light
    rounded-xl transition ease-in-out bg-red-600
  hover:bg-red-200 hover:text-red-700 flex items-center'>
            <FcGoogle className='mr-2 text-2xl rounded-full' />
            Continue with Google
        </button>
    )
}

export default OAuth