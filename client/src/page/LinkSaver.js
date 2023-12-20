import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { FaCopy, FaTimes } from 'react-icons/fa';
import LinkContainer from '../Link/LinkContainer';
import LinkModal from '../Link/LinkModal';

const LinkSaver = () => {
    const [modal, setModal] = useState({
        link: false,
        delete: false,
    })
    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4 text-violet-600'>Link Saved</h1>
            <div className='w-full flex flex-col items-center'>
                <div className='w-5/6 flex justify-end my-2'>
                    <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-30' onClick={() => setModal(prevModal => ({ ...prevModal, link: true }))}>
                        Save Link
                    </button>
                </div>
                <div className='w-5/6'>
                    <div className='flex justify-around mb-2'>
                        <div className='text-gray-500 text-sm font-medium'>Link Name</div>
                        <div className='text-gray-500 text-sm font-medium'>Category</div>
                        <div className='text-gray-500 text-sm font-medium'>Description</div>
                        <div className='text-gray-500 text-sm font-medium'>Action</div>
                    </div>
                    <LinkContainer className='flex  mb-2 pt-2'>
                        <div className='flex justify-center  text-sm font-light w-1/4 '>Test</div>
                        <div className='flex justify-center  text-sm font-light w-1/4 '>English</div>
                        <div className=' flex justify-center text-sm font-light w-1/4 '>Test</div>
                        <div className='flex justify-center  space-x-2 w-1/4 '>
                            <div><FaCopy className='text-gray-600 cursor-pointer' /></div>
                            <div className='bg-red-500 p-1 rounded-full'><FaTimes className='text-white cursor-pointer text-xs' onClick={() => setModal(prevModal => ({ ...prevModal, delete: true }))} /></div>
                        </div>
                    </LinkContainer>
                </div>
            </div>
            {modal.link === true && (
                <LinkModal>
                    test
                </LinkModal>
            )}
            {modal.delete === true && (
                <div>

                </div>
            )
            }
        </Layout>
    );
};

export default LinkSaver;