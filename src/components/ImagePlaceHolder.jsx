import React from 'react'

const ImagePlaceHolder = ({ children }) => {
    return (
        <>
            <img src='' alt='pokemon image' 
            className='flex-1 max-h-full max-w-full
            backdrop-blur-md' />
            {children}
        </>
    )
}

export default ImagePlaceHolder