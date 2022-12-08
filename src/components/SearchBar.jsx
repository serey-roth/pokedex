import React, { useState } from 'react'

import { ImCancelCircle, ImSearch } from 'react-icons/im';

const SearchBar = ({ search, onChange }) => {
    const [visibleBar, setVisibleBar] = useState(false);
    
    return (
        <div className='flex h-[50px] gap-3 items-center outline-none
        border-0 appearance-none'>
            {visibleBar ? (
            <>
            <input 
            className='rounded-lg py-1 px-2 animate-slideleft
            text-black'
            name='searchInput'
            id='searchInput'
            type='text' 
            value={search} 
            placeholder='e.g. Squirtle' 
            onChange={onChange} />
            <button className='animate-slideleft' 
            onClick={() => {
                setVisibleBar(false);
                updateSearch('');
            }}>
                <ImCancelCircle className='scale-110 hover:scale-125
                transition-transform' />
            </button>
            </>
            ) 
            : (
            <button className='animate-slideright hover:scale-125
            scale-110 transition-transform' 
            onClick={() => setVisibleBar(true)}>
                <ImSearch />
            </button>
            )}
        </div>
    )
}

export default SearchBar