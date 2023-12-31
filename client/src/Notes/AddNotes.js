import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';

const AddNotes = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className='md:w-1/4 sm:w-1/2 xs:w-1/2  xxs:w-full p-6 border-2 border-[#8B4513] rounded-md cursor-pointer hover:border-[#5D3317] transition duration-300 ease-in-out flex flex-col items-center'>
            <IoIosAddCircle className='text-5xl text-[#8B4513]' />
        </div>
    );
};

export default AddNotes;
