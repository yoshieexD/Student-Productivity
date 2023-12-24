import React, { useContext, useState } from 'react';
import { FaEllipsisH } from "react-icons/fa";
import Layout from '../Layout/Layout';

//todo components
import TodoCard from '../todo/TodoCard';
import TodoContainer from '../todo/TodoContainer';
import AddCard from '../todo/AddCard';
import Modals from '../shared/Modals';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import SubmitBtn from '../shared/button/SubmitBtn';
import { AuthContext } from '../context/authStore';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
const api = process.env.REACT_APP_API_URL;
const Todo = () => {
    const user = useContext(AuthContext);
    const [right, setRight] = useState({
        update: false,
        delete: false,
        view: false,
    })
    const [data, setData] = useState({
        title: '',
        description: '',
        end_date: '',
    });
    const [Modal, setModal] = useState({
        todo: false,
        doing: false,
        done: false,
        update: false,
        delete: false,
        view: false,
    })
    const [confirm, setConfirm] = useState({
        delete: '',
    })
    const [soloData, setSoloData] = useState([]);
    const queryClient = useQueryClient();

    const update = useMutation(
        async () => {
            const response = await axios.put(`${api}/todo/update-todo/${soloData._id}`, soloData);
            return response.data;
        }, {
        onSuccess: async () => {
            toast.success(`Successfully update`);
            setModal(prevModal => ({ ...prevModal, update: false }));
            await queryClient.invalidateQueries('get-todo');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })

    const deleteMutation = useMutation(async (id) => {
        return await axios.delete(`${api}/todo/delete-todo/${id}`)
    },
        {
            onSuccess: () => {
                toast.success('Successfully deleted');
                queryClient.invalidateQueries('get-todo');
            }
        }
    )
    const mutation = useMutation(
        async (todoType) => {
            const response = await axios.post(`${api}/todo/create-todo`, { ...data, userId: user._id, type: todoType });
            return response.data;
        },

        {
            onSuccess: async () => {
                toast.success(`Successfully submitted`);
                setData({
                    title: '',
                    description: '',
                    end_date: '',
                })
                setModal({
                    todo: false,
                    doing: false,
                    done: false,
                })
                await queryClient.invalidateQueries('get-todo');
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });

    const handlePost = (event, todoType) => {
        event.preventDefault();
        mutation.mutate(todoType);
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        update.mutate();
    }
    const handleDelete = async () => {
        if (confirm.delete.trim() === 'Confirm, I want to delete') {
            try {
                await deleteMutation.mutate(soloData._id);
                setModal(prevModal => ({ ...prevModal, delete: false }));
                setConfirm((prev) => ({ ...prev, delete: '' }));
            } catch (error) {
                toast.error('Failed to delete todo');
            }
        } else {
            toast.error('Confirmation text does not match');
        }
    };
    const { data: getData } = useQuery('get-todo', async () => {
        const response = await axios.get(`${api}/todo/get-todo`);
        return response.data;
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        setSoloData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleContextMenu = (event, e) => {
        event.preventDefault();
        if (right.update && right.delete && right.view === true) {
            setRight(
                {
                    view: false,
                    update: false,
                    delete: false,
                }
            )
        } else {
            setSoloData(e);
            setRight({
                update: true,
                delete: true,
                view: true,
                contextMenuPosition: { top: event.clientY, left: event.clientX }
            });
        }

    };

    return (
        <Layout>
            <div>
                <h1 className="text-2xl font-semibold  text-green-600">Todo Board</h1>
                <p className='italic text-base mb-4 text-gray-700'>Note: If you want to view, update, or delete, simply hover and right-click.</p>
                <div className='flex justify-around '>
                    <div className='flex flex-col w-3/12'>
                        {getData?.filter(item => item.type === "Todo" && item.userId === user._id).map((e, index, array) => (
                            <>
                                <TodoContainer key={e._id} onContextMenu={(event) => handleContextMenu(event, e)} title={index === 0 ? 'Todo' : ''} icon={index === 0 && <FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    {index !== 0 && <div className='my-2'></div>}
                                    <TodoCard title={e.title} description={e.description} key={e._id} />
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        {(index === array.length - 1) && <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, todo: true }))}> Add a card...</AddCard>}
                                    </div>
                                </TodoContainer>
                                <br />
                            </>
                        ))}

                        {getData?.filter(item => item.type === "Todo" && item.userId === user._id).length === 0 && (
                            <>
                                <TodoContainer title={'To do'} onContextMenu={(e) => { e.preventDefault(); }} icon={<FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, todo: true }))}>
                                            Add a card...
                                        </AddCard>
                                    </div>
                                </TodoContainer>

                            </>
                        )}
                    </div>

                    <div className='flex flex-col w-3/12'>
                        {getData?.filter(item => item.type === "Doing" && item.userId === user._id).map((e, index, array) => (
                            <>
                                <TodoContainer key={e._id} onContextMenu={(event) => handleContextMenu(event, e)} title={index === 0 ? 'Doing' : ''} icon={index === 0 && <FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    {index !== 0 && <div className='my-2'></div>}
                                    <TodoCard title={e.title} description={e.description} key={e._id} />
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        {(index === array.length - 1) && <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, doing: true }))}> Add a card...</AddCard>}
                                    </div>
                                </TodoContainer>
                                <br />
                            </>
                        ))}

                        {getData?.filter(item => item.type === "Doing" && item.userId === user._id).length === 0 && (
                            <>
                                <TodoContainer title={'Doing'} onContextMenu={(e) => { e.preventDefault(); }} icon={<FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, doing: true }))}> Add a card...</AddCard>
                                    </div>
                                </TodoContainer>
                            </>
                        )}
                    </div>

                    <div className='flex flex-col w-3/12'>
                        {getData?.filter(item => item.type === "Done" && item.userId === user._id).map((e, index, array) => (
                            <>
                                <TodoContainer key={e._id} onContextMenu={(event) => handleContextMenu(event, e)} title={index === 0 ? 'Done' : ''} icon={index === 0 && <FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    {index !== 0 && <div className='my-2'></div>}
                                    <TodoCard title={e.title} description={e.description} key={e._id} />
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        {(index === array.length - 1) && <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, done: true }))}> Add a card...</AddCard>}
                                    </div>
                                </TodoContainer>
                                <br />
                            </>
                        ))}

                        {getData?.filter(item => item.type === "Done" && item.userId === user._id).length === 0 && (
                            <>
                                <TodoContainer title={'Done'} onContextMenu={(e) => { e.preventDefault(); }} icon={<FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, done: true }))}> Add a card...</AddCard>
                                    </div>
                                </TodoContainer>
                            </>
                        )}

                    </div>
                </div>
            </div>
            <Modals title={'Add Todo'} isOpen={Modal.todo} onClose={() => setModal((prevModal) => ({ ...prevModal, todo: false }))}>
                <form onSubmit={(event) => handlePost(event, 'Todo')}>
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={data.title} onChange={handleChange} required />
                    <br />
                    <Input type={"date"} name={"end_date"} placeholder={"End Date"} value={data.end_date} onChange={handleChange} />
                    <br />
                    <TextArea name={"description"} placeholder={"Description"} value={data.description} onChange={handleChange} />
                    <SubmitBtn type={"Submit"} disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Submitting" : "Submit"}
                    </SubmitBtn>
                </form>
            </Modals>
            <Modals title={'Add Doing'} isOpen={Modal.doing} onClose={() => setModal((prevModal) => ({ ...prevModal, doing: false }))}>
                <form onSubmit={(event) => handlePost(event, 'Doing')}>
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={data.title} onChange={handleChange} required />
                    <br />
                    <Input type={"date"} name={"end_date"} placeholder={"End Date"} value={data.end_date} onChange={handleChange} />
                    <br />
                    <TextArea name={"description"} placeholder={"Description"} value={data.description} onChange={handleChange} />
                    <SubmitBtn type={"Submit"} disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Submitting" : "Submit"}
                    </SubmitBtn>
                </form>
            </Modals>
            <Modals title={'Add Done'} isOpen={Modal.done} onClose={() => setModal((prevModal) => ({ ...prevModal, done: false }))}>
                <form onSubmit={(event) => handlePost(event, 'Done')}>
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={data.title} onChange={handleChange} required />
                    <br />
                    <Input type={"date"} name={"end_date"} placeholder={"End Date"} value={data.end_date} onChange={handleChange} />
                    <br />
                    <TextArea name={"description"} placeholder={"Description"} value={data.description} onChange={handleChange} />
                    <SubmitBtn type={"Submit"} disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Submitting" : "Submit"}
                    </SubmitBtn>
                </form>
            </Modals>
            <Modals title={"View"} isOpen={Modal.view} onClose={() => setModal((prev) => ({ ...prev, view: false }))}>
                <form >
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={soloData?.title} disabled />
                    <br />
                    <Input type={"date"} name={"end_date"} placeholder={"End Date"} value={soloData?.end_date} disabled />
                    <br />
                    <TextArea name={"description"} placeholder={"Description"} value={soloData?.description} disabled />
                </form>
            </Modals>
            <Modals title={'Update'} isOpen={Modal.update} onClose={() => setModal((prev) => ({ ...prev, update: false }))} >
                <form onSubmit={handleUpdate}>
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={soloData?.title} onChange={handleChange} required />
                    <br />
                    <Input type={"date"} name={"end_date"} placeholder={"End Date"} value={soloData?.end_date} onChange={handleUpdateChange} />
                    <br />
                    <TextArea name={"description"} placeholder={"Description"} value={soloData?.description} onChange={handleUpdateChange} />
                    <SubmitBtn type={"Submit"} disabled={update.isLoading}>
                        {update.isLoading ? "Updating" : "Update"}
                    </SubmitBtn>
                </form>
            </Modals>
            <Modals title={'Confirm Delete'} isOpen={Modal.delete} onClose={() => setModal((prev) => ({ ...prev, delete: false }))}>
                <p>Please type <b>'Confirm, I want to delete'</b></p>
                <Input
                    placeholder={"Type 'Confirm, I want to delete'"}
                    value={confirm.delete}
                    onChange={(e) => setConfirm((prevConfirm) => ({ ...prevConfirm, delete: e.target.value }))}
                />
                <br />
                <SubmitBtn onclick={handleDelete} disabled={deleteMutation.isLoading}>
                    {deleteMutation.isLoading ? "Deleting" : "Delete"}
                </SubmitBtn>
            </Modals>
            {right.update && (
                <div className="absolute bg-white border border-gray-300 p-2 z-10"
                    style={{ top: right.contextMenuPosition.top, left: right.contextMenuPosition.left }}>
                    <div className="cursor-pointer hover:bg-gray-100 py-1 px-2" onClick={() => { setModal(prevModal => ({ ...prevModal, view: true })); setRight({ update: false, delete: false, view: false, }) }}>View</div>
                    <div className="cursor-pointer hover:bg-gray-100 py-1 px-2" onClick={() => { setModal(prevModal => ({ ...prevModal, update: true })); setRight({ update: false, delete: false, view: false, }) }}>Update</div>
                    <div className="cursor-pointer hover:bg-gray-100 py-1 px-2" onClick={() => { setModal(prevModal => ({ ...prevModal, delete: true })); setRight({ update: false, delete: false, view: false }) }}>Delete</div>
                </div>
            )}
        </Layout>
    );
};

export default Todo;