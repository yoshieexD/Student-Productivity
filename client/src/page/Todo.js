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
    const [data, setData] = useState({
        title: '',
        description: '',
        end_date: '',
    });
    const [Modal, setModal] = useState({
        todo: false,
        doing: false,
        done: false,
    })

    const queryClient = useQueryClient();

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

    return (
        <Layout>
            <div>
                <h1 className="text-2xl font-semibold mb-4 text-green-600">Todo Board</h1>
                <div className='flex justify-around '>
                    <div className='flex flex-col w-3/12'>
                        {getData?.filter(item => item.type === "Todo" && item.userId === user._id).map((e, index, array) => (
                            <>
                                <TodoContainer key={e._id} title={index === 0 ? 'To do' : ''} icon={index === 0 && <FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    {index !== 0 && <div className='my-2'></div>}
                                    <TodoCard title={e.title} key={e.id} />
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        {(index === array.length - 1) && <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, todo: true }))}> Add a card...</AddCard>}
                                    </div>
                                </TodoContainer>
                                <br />
                            </>
                        ))}
                        {getData?.filter(item => item.type === "Todo" && item.userId === user._id).length === 0 && (
                            <>
                                <TodoContainer title={'To do'} icon={<FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, todo: true }))}> Add a card...</AddCard>
                                    </div>
                                </TodoContainer>
                            </>
                        )}
                    </div>

                    <div className='flex flex-col w-3/12'>
                        {getData?.filter(item => item.type === "Doing" && item.userId === user._id).map((e, index, array) => (
                            <>
                                <TodoContainer key={e._id} title={index === 0 ? 'Doing' : ''} icon={index === 0 && <FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    {index !== 0 && <div className='my-2'></div>}
                                    <TodoCard title={e.title} key={e.id} />
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        {(index === array.length - 1) && <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, doing: true }))}> Add a card...</AddCard>}
                                    </div>
                                </TodoContainer>
                                <br />
                            </>
                        ))}
                        {getData?.filter(item => item.type === "Doing" && item.userId === user._id).length === 0 && (
                            <>
                                <TodoContainer title={'Doing'} icon={<FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
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
                                <TodoContainer key={e._id} title={index === 0 ? 'Done' : ''} icon={index === 0 && <FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
                                    {index !== 0 && <div className='my-2'></div>}
                                    <TodoCard title={e.title} key={e.id} />
                                    <div className='flex justify-start w-full ml-5 mt-2 mb-2'>
                                        {(index === array.length - 1) && <AddCard onclick={() => setModal(prevModal => ({ ...prevModal, done: true }))}> Add a card...</AddCard>}
                                    </div>
                                </TodoContainer>
                                <br />
                            </>
                        ))}
                        {getData?.filter(item => item.type === "Done" && item.userId === user._id).length === 0 && (
                            <>
                                <TodoContainer title={'Done'} icon={<FaEllipsisH className='text-gray-400 text-xs cursor-pointer' />}>
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
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={data.title} onChange={handleChange} />
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
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={data.title} onChange={handleChange} />
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
                    <Input type={"text"} name={"title"} placeholder={"Title"} value={data.title} onChange={handleChange} />
                    <br />
                    <Input type={"date"} name={"end_date"} placeholder={"End Date"} value={data.end_date} onChange={handleChange} />
                    <br />
                    <TextArea name={"description"} placeholder={"Description"} value={data.description} onChange={handleChange} />
                    <SubmitBtn type={"Submit"} disabled={mutation.isLoading}>
                        {mutation.isLoading ? "Submitting" : "Submit"}
                    </SubmitBtn>
                </form>
            </Modals>

        </Layout>
    );
};

export default Todo;