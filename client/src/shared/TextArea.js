import React from 'react';

const TextArea = ({ placeholder, className, name, type, onChange, value }) => {
    return (
        <div>
            <textarea type={type || "text"} name={name} placeholder={placeholder} className={`w-full px-2 border border-gray-300 rounded-md focus:outline-none ${className}`} value={value} onChange={onChange} />
        </div>
    );
};

export default TextArea;