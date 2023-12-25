import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import SubmitBtn from '../shared/button/SubmitBtn';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import { AuthContext } from '../context/authStore';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
const api = process.env.REACT_APP_API_URL;
const Untitled = () => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const [data, setData] = useState({
        userId: user._id,
        title: '',
        description: '',
        date: new Date(),
    })
    const post = useMutation(async () => {
        const response = await axios.post(`${api}/notes/create-notes`, data);
        return response.data;
    }, {
        onSuccess: async () => {
            await toast.success('Successfully submitted');
            navigate('/auth/notes');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })
    const handlePost = (event) => {
        event.preventDefault();
        post.mutate();
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    return (
        <Layout>
            <div className='w-full'>
                {/* Header */}
                <form onSubmit={handlePost}>
                    <div className='flex w-full  justify-between'>
                        <div className='w-4/6'>
                            <Input placeholder={'Title'} name={"title"} value={data.title} onChange={handleChange} />
                        </div>
                        <SubmitBtn type={'Submit'}>Save</SubmitBtn>
                    </div>
                    <TextArea value={data.description} name={"description"} onChange={handleChange} placeholder={"Write something..."} />
                </form>
            </div>
        </Layout>
    );
};

export default Untitled;