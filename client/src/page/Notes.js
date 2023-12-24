import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import AddNotes from '../Notes/AddNotes';
import NotesContainer from '../Notes/NotesContainer';
const Notes = () => {
    const [right, setRight] = useState({
        update: false,
        delete: false,
        view: false,
    })
    const [modal, setModal] = useState({
        update: false,
        delete: false,
        view: false,
    });
    const handleContextMenu = (event) => {
        event.preventDefault();
        if (right.update && right.view && right.delete === true) {
            setRight(
                {
                    view: false,
                    update: false,
                    delete: false,
                }
            )
        } else {
            setRight({
                update: true,
                delete: true,
                view: true,
                contextMenuPosition: { top: event.clientY, left: event.clientX }
            });
        }
    }
    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4' style={{ color: '#8B4513' }}>Notes</h1>
            <p className='italic text-base mb-4 text-gray-700'>Note: If you want to view, update, or delete, simply hover and right-click.</p>
            <div className='w-full flex space-x-2'>
                <NotesContainer title="test" description="hello world" onContextMenu={(event) => handleContextMenu(event)} />
                <AddNotes />
            </div>
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

export default Notes;