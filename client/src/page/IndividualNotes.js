import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import SubmitBtn from '../shared/button/SubmitBtn';
import { useQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify'
import axios from 'axios';
const api = process.env.REACT_APP_API_URL;
const IndividualNotes = () => {
    const navigate = useNavigate();
    const [update, setUpdate] = useState([]);
    const { id } = useParams();
    const { data } = useQuery('get-notes', async () => {
        const response = await axios.get(`${api}/notes/get-notes/${id}`)
        return setUpdate(response.data);
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdate((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const updates = useMutation(async () => {
        const response = await axios.put(`${api}/notes/update-notes/${id}`, update);
        return response.data;
    }, {
        onSuccess: async () => {
            await toast.success('Successfully submitted');
            navigate('/auth/notes')
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    }
    )
    const handleUpdate = (e) => {
        e.preventDefault();
        updates.mutate();
    }
    return (
        <Layout>
            <div className='w-full'>
                {/* Header */}
                <form onSubmit={handleUpdate}>
                    <div className='flex w-full  justify-between'>
                        <div className='w-4/6'>
                            <Input placeholder={'Title'} name={"title"} value={update.title} onChange={handleChange} />
                        </div>
                        <SubmitBtn type={'Submit'}>Save</SubmitBtn>
                    </div>
                    <TextArea value={update.description} name={"description"} onChange={handleChange} placeholder={"Write something..."} />
                </form>
            </div>
        </Layout>
    );
};

export default IndividualNotes;