import React from 'react';
import TodoCard from './TodoCard';
import TodoContainer from './TodoContainer';
import { FaEllipsisH } from "react-icons/fa";
import AddCard from './AddCard';
const Todo = () => {
    return (
        <div className='h-screen'>
            <h1 className="text-2xl font-semibold mb-4 text-blue-600">Todo Board</h1>
            <div className='flex justify-around '>
                <TodoContainer>
                    <div className='flex justify-between w-full w-[94%] font-semibold my-2'>
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
                    <div className='flex justify-between w-full w-[94%] w-full  font-semibold my-2'>
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
                    <div className='flex justify-between w-full w-[94%] w-full  font-semibold my-2'>
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
    );
};

export default Todo;