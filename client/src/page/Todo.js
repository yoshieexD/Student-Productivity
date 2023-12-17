import React from 'react';
import { FaEllipsisH } from "react-icons/fa";
import Layout from '../Layout/Layout';

//todo components
import TodoCard from '../todo/TodoCard';
import TodoContainer from '../todo/TodoContainer';
import AddCard from '../todo/AddCard';

const Todo = () => {
    return (
        <Layout>
            <div>
                <h1 className="text-2xl font-semibold mb-4 text-green-600">Todo Board</h1>
                <div className='flex justify-around '>
                    <TodoContainer>
                        <div className='flex justify-between w-full w-[92%] font-semibold my-2'>
                            To do
                            <FaEllipsisH className='text-gray-400 text-xs' />
                        </div>
                        <TodoCard>
                            test
                        </TodoCard>
                        <div className='flex justify-start w-full ml-5'>
                            <AddCard> Add a card...</AddCard>
                        </div>
                    </TodoContainer>
                    <TodoContainer>
                        <div className='flex justify-between w-full w-[92%] w-full  font-semibold my-2'>
                            Doing
                            <FaEllipsisH className='text-gray-400 text-xs' />
                        </div>
                        <TodoCard>
                            test
                        </TodoCard>
                        <div className='flex justify-start w-full ml-5'>
                            <AddCard>Add a card...</AddCard>
                        </div>
                    </TodoContainer>
                    <TodoContainer>
                        <div className='flex justify-between w-full w-[92%] w-full  font-semibold my-2'>
                            Done
                            <FaEllipsisH className='text-gray-400 text-xs' />
                        </div>
                        <TodoCard>
                            test
                        </TodoCard>
                        <div className='flex justify-start w-full ml-5'>
                            <AddCard>Add a card...</AddCard>
                        </div>
                    </TodoContainer>
                </div>
            </div>
        </Layout>
    );
};

export default Todo;