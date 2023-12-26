import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
const SearchBar = ({ placeholder, onclick, onchange, value, name }) => {
    return (
        <div className='flex  flex-row items-center border border-gray-300 h-[40px] space-x-1'>
            <IoSearchOutline className='text-gray-400 ml-2 cursor-pointer' onClick={onclick} />
            <input type='text' className='appearance-none focus:outline-none h-full bg-slate-50' placeholder={placeholder} name={name} value={value} onChange={onchange} />
        </div>
    );
};

export default SearchBar;