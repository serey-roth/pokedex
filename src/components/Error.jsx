import React from 'react'

import { TbError404 } from 'react-icons/tb'

const Error = () => {
    return (
        <div className='w-screen min-h-screen flex flex-col items-center 
        justify-center gap-1'>
            <TbError404 className='w-[100px] h-[100px] text-red-500 animate-pulse' />
            <p className='font-semibold text-xl'>Something went wrong!</p>
        </div>
    )
}

export default Error