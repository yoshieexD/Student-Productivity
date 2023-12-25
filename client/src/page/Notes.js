import React, { useContext, useState } from 'react';
import Layout from '../Layout/Layout';
import AddNotes from '../Notes/AddNotes';
import { useNavigate } from 'react-router-dom';
import NotesContainer from '../Notes/NotesContainer';
import { AuthContext } from '../context/authStore';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Modals from '../shared/Modals';
import { toast } from 'react-toastify';
import SubmitBtn from '../shared/button/SubmitBtn';
import axios from 'axios';
import Input from '../shared/Input';
const api = process.env.REACT_APP_API_URL;
const Notes = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const [right, setRight] = useState({
        update: false,
        delete: false,
        view: false,
    })
    const [modal, setModal] = useState({
        delete: false,
    });
    const [confirm, setConfirm] = useState({
        delete: '',
    })
    const [id, setId] = useState('');
    const queryClient = useQueryClient();

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
    const deletes = useMutation(async (id) => {
        return await axios.delete(`${api}/notes/delete-notes/${id}`)
    },
        {
            onSuccess: () => {
                toast.success('Successfully deleted');
                queryClient.invalidateQueries('get-notes');
            }
        });

    const { data: getData } = useQuery('get-notes', async () => {
        const response = await axios.get(`${api}/notes/get-notes`)
        return response.data;
    });
    const handleDelete = async () => {
        if (confirm.delete.trim() === 'Confirm, I want to delete') {
            try {
                await deletes.mutate(id);
                setModal((prevModal) => ({ ...prevModal, delete: false }));
                setConfirm((prev) => ({ ...prev, delete: '' }));
            } catch (error) {
                toast.error('Failed to delete link');
            }
        } else {
            toast.error('Confirmation text does not match');
        }
    };

    const handleDirect = (loc) => {
        if (loc === "view") {
            navigate(`/auth/notes/page/${id}`)
        }
    }
    const filteredData = Array.isArray(getData) ? getData.filter(item => item.userId === user._id) : [];

    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4' style={{ color: '#8B4513' }}>Notes</h1>
            <p className='italic text-base mb-4 text-gray-700'>Note: If you want to view, update, or delete, simply hover and right-click.</p>
            <div className='w-full flex space-x-2'>
                {filteredData.map((e) => (
                    <NotesContainer key={e._id} title={e.title} description={e.description} onContextMenu={(event) => { handleContextMenu(event); setId(e._id) }} />
                ))}
                <AddNotes onClick={() => navigate('/auth/notes/untitled=1')} />
            </div>
            {right.update && (
                <div className="absolute bg-white border border-gray-300 p-2 z-10"
                    style={{ top: right.contextMenuPosition.top, left: right.contextMenuPosition.left }}>
                    <div className="cursor-pointer hover:bg-gray-100 py-1 px-2" onClick={() => { handleDirect('view'); setRight({ update: false, delete: false, view: false, }) }}>View</div>
                    <div className="cursor-pointer hover:bg-gray-100 py-1 px-2" onClick={() => { setModal(prevModal => ({ ...prevModal, delete: true })); setRight({ update: false, delete: false, view: false }) }}>Delete</div>
                </div>
            )}
            <Modals title={"Confirm Delete"} isOpen={modal.delete} onClose={() => { setModal((prevModal) => ({ ...prevModal, delete: false })); setConfirm((prev) => ({ ...prev, delete: '' })) }}>
                <p>Please type <b>'Confirm, I want to delete'</b></p>
                <Input
                    placeholder={"Type 'Confirm, I want to delete'"}
                    value={confirm.delete}
                    onChange={(e) => setConfirm((prevConfirm) => ({ ...prevConfirm, delete: e.target.value }))}
                />
                <br />
                <SubmitBtn onclick={handleDelete} disabled={deletes.isLoading}>
                    {deletes.isLoading ? "Deleting" : "Delete"}
                </SubmitBtn>
            </Modals>
        </Layout>
    );
};

export default Notes;