import React, { useState, useEffect } from 'react'

const LoadedImage = ({ height, width, src, name }) => {
    const [status, setStatus] = useState('pending');
    const [image, setImage] = useState();
    
    useEffect(() => {
        const image = new Image();
        image.onload = () => setStatus('success')
        image.onerror = () => setStatus('failure')
        image.src = src;
        setImage(image)
    }, [src])
    

    return (
        <>
            {status === 'success' ? (
                <img
                src={image?.src}
                alt={name} 
                style={{
                    width: width, 
                    height: height,
                    objectPosition: 'top',
                    objectFit: 'cover',
                    aspectRatio: '1 / 1'
                }} 
                loading='lazy'
                />
            ) : (
                <div 
                className='bg-slate-400 animate-pulse'
                style={{
                    height: height,
                    width: width,
                }}></div>
            )}
        </>
    )
}

export default LoadedImage