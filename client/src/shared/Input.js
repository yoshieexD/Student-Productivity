import React from 'react';

const Input = ({ type, name, value, onChange, placeholder, className }) => {
    return (
        <input type={type || 'text'} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`relative mt-1 px-2 block w-full border border-gray-300 rounded-md focus:outline-none ${className} `} />
    );
};

export default Input;