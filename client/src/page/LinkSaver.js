import React, { useContext, useState } from 'react';
import Layout from '../Layout/Layout';
import { FaCopy, FaTimes } from 'react-icons/fa';
import LinkContainer from '../Link/LinkContainer';
import Modals from '../shared/Modals'
import SubmitBtn from '../shared/button/SubmitBtn';
import Input from '../shared/Input';
import { AuthContext } from '../context/authStore';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import TextArea from '../shared/TextArea'
const api = process.env.REACT_APP_API_URL;
const LinkSaver = () => {
    const user = useContext(AuthContext);
    const [data, setData] = useState({
        title: '',
        link: '',
        category: '',
        description: '',
    });
    const [modal, setModal] = useState({
        link: false,
        delete: false,
    })
    const [confirm, setConfirm] = useState({
        delete: '',
    })
    const [id, setId] = useState('');

    const queryClient = useQueryClient();

    const mutation = useMutation(async () => {
        const response = await axios.post(`${api}/link/create-link`, { ...data, userId: user._id });
        return response.data;
    },
        {
            onSuccess: async () => {
                toast.success(`Successfully submitted`);
                setData({
                    title: '',
                    link: '',
                    category: '',
                    description: '',
                });
                await queryClient.invalidateQueries('get-link');
                setModal((prevModal) => ({ ...prevModal, link: false }));
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        })
    const handlePost = (event) => {
        event.preventDefault();
        mutation.mutate();
    }
    const deletePostMutation = useMutation(async (id) => {
        return await axios.delete(`${api}/link/delete-link/${id}`)
    },
        {
            onSuccess: () => {
                toast.success('Successfully deleted');
                setData('');
                queryClient.invalidateQueries('get-link');
            }
        });

    const handleDelete = async () => {
        if (confirm.delete.trim() === "I want to delete this link") {
            try {
                await deletePostMutation.mutate(id);
                setModal((prevModal) => ({ ...prevModal, delete: false }));
                setConfirm((prev) => ({ ...prev, delete: '' }));
            } catch (error) {
                toast.error('Failed to delete link');
            }
        } else {
            toast.error('Confirmation text does not match');
        }
    };

    const { data: getData } = useQuery('get-link', async () => {
        const response = await axios.get(`${api}/link/get-link`);
        return response.data;
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleClipBoard = (e) => {
        navigator.clipboard.writeText(e.link)
        toast.success('Successfully Clipboard')

    }
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
                    {
                        <>
                            <div className=' flex justify-center items-center'>
                                {getData?.filter(item => item.userId === user.id).length === 0 && <p className='text-gray-400 font-semibold italic text-lg'>No links available.</p>}
                            </div>
                            {getData?.filter(item => item.userId === user._id).map((e) => {
                                return (
                                    <LinkContainer
                                        className='flex mb-2 pt-2'
                                        linkName={e.title}
                                        category={e.category}
                                        description={e.description ? e.description.slice(0, 10) : ''}
                                        key={e._id}
                                    >
                                        <div className='flex justify-center space-x-2 w-1/4'>
                                            <div>
                                                <FaCopy className='text-gray-600 cursor-pointer' onClick={() => handleClipBoard(e)} />
                                            </div>
                                            <div className='bg-red-500 p-1 rounded-full'>
                                                <FaTimes
                                                    className='text-white cursor-pointer text-xs'
                                                    onClick={() => {
                                                        setModal((prevModal) => ({ ...prevModal, delete: true }));
                                                        setId(e._id);
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    </LinkContainer>
                                );
                            })}
                        </>
                    }
                </div>
            </div>
            <Modals title={'Add Link'} isOpen={modal.link} onClose={() => setModal((prevModal) => ({ ...prevModal, link: false }))}>
                <form onSubmit={handlePost}>
                    <Input placeholder={"Title"} className={"py-2"} name={"title"} value={data.title} onChange={handleChange} />
                    <br />
                    <Input type="text" placeholder={"Link"} className={"py-2"} name={"link"} value={data.link} onChange={handleChange} />
                    <br />
                    <Input placeholder={"Category"} className={"py-2"} name={"category"} value={data.category} onChange={handleChange} />
                    <br />
                    <TextArea placeholder={"Description"} className={"py-2"} name={"description"} value={data.description} onChange={handleChange} />
                    <br />
                    <SubmitBtn type={"Submit"} disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Submitting" : "Submit"}
                    </SubmitBtn>
                </form>
            </Modals>
            <Modals title={"Confirm Delete"} isOpen={modal.delete} onClose={() => { setModal((prevModal) => ({ ...prevModal, delete: false })); setConfirm((prev) => ({ ...prev, delete: '' })) }}>
                <p>Please type <b>"I want to delete this link"</b></p>
                <Input
                    placeholder={"Type 'I want to delete this link'"}
                    value={confirm.delete}
                    onChange={(e) => setConfirm((prevConfirm) => ({ ...prevConfirm, delete: e.target.value }))}
                />
                <br />
                <SubmitBtn onclick={handleDelete} disabled={deletePostMutation.isLoading}>
                    {deletePostMutation.isLoading ? "Deleting" : "Delete"}
                </SubmitBtn>
            </Modals>
        </Layout >
    );
};

export default LinkSaver;