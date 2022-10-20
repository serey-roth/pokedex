import React from 'react'

import { ImSpinner } from 'react-icons/im'

const Loader = () => {
    return (
        <div className='w-screen flex flex-col items-center 
        h-[110vh] justify-center gap-5'>
            <ImSpinner className='animate-spin w-[50px] h-[50px]' />
            <p className='font-semibold text-xl'>Loading Data</p>
        </div>
    )
}

export default Loader