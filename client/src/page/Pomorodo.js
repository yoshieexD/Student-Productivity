import React, { useState, useContext, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Container from '../shared/Container';
import { AuthContext } from '../context/authStore';
import { FaCog } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import PomorodoContainer from '../pomorodo/PomorodoContainer';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import Modals from '../shared/Modals';
import Input from '../shared/Input';
import SubmitBtn from '../shared/button/SubmitBtn';
const api = process.env.REACT_APP_API_URL;
const Pomorodo = () => {
    const user = useContext(AuthContext);
    const [data, setData] = useState({
        minutes: '',
        date: '',
        history: '',
        points: '',
    })
    const [iteration, setIteration] = useState(0);
    const [edit, setEdit] = useState({
        modal: false,
        max: 4,
        minutes: 25,
    });
    const [update, setUpdate] = useState({
        max: '',
        minutes: '',
    })
    const [secondsLeft, setSecondsLeft] = useState(edit.minutes * 60);
    const [ternary, setTernary] = useState(false);
    const [intervalId, setIntervalId] = useState('');

    const handleStart = () => {
        if (ternary === false) {
            setTernary(true);
            const id = setInterval(() => {
                setSecondsLeft((prevSecondsLeft) => {
                    if (prevSecondsLeft === 0) {
                        setTernary(false);
                        setIteration((prevIteration) => prevIteration + 1);
                        clearInterval(id);
                        return edit.minutes * 60;
                    }
                    return prevSecondsLeft - 1;
                });
            }, 1000);
            setIntervalId(id);
        } else {
            setTernary(false);
            clearInterval(intervalId);
        }
    };

    const queryClient = useQueryClient();
    const { data: getData } = useQuery('get-pomorodo', async () => {
        const response = await axios.get(`${api}/pomorodo/get-pomorodo`);
        return response.data
    })
    const post = useMutation(async () => {
        const total = edit.minutes * edit.max;
        let point = '';
        if (total >= 30) {
            point = 2
        } else if (total >= 60) {
            point = 5
        } else if (total >= 120) {
            point = 12
        } else {
            point = 0;
        }
        const response = await axios.post(`${api}/pomorodo/create-pomorodo`, { ...data, userId: user._id, points: point, minutes: total, date: new Date() });
        return response.data;
    },
        {
            onSuccess: async () => {
                setData({
                    minutes: '',
                    date: '',
                    history: '',
                    points: '',
                })
                await queryClient.invalidateQueries('get-pomorodo');
            }
        })

    useEffect(() => {
        const handlePostMutation = async () => {
            try {
                if (parseInt(iteration) >= parseInt(edit.max)) {
                    await post.mutate();
                    setIteration(0);
                }
            } catch (error) {
                console.error('Error during post mutation:', error);
            }
        };
        handlePostMutation();
    }, [iteration, edit.max, post]);

    const minutesDisplay = Math.floor(secondsLeft / 60);
    const secondsDisplay = secondsLeft % 60;

    useEffect(() => {
        setSecondsLeft(edit.minutes * 60);
    }, [edit.minutes]);
    const handleSetting = (e) => {
        e.preventDefault();
        setEdit({
            max: update.max,
            minutes: update.minutes,
        });
    };

    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4 text-red-600'>Pomorodo</h1>
            <div className='flex flex-col items-center h-screen'>
                <div className='w-4/5 h-2/5 flex space-x-5'>
                    <Container className='w-1/2 h-full flex flex-col items-center p-4'>
                        <div className='w-full flex justify-between'>
                            <p className='text-sm text-gray-400 italic'>{iteration}/{edit.max}</p>
                            <button onClick={() => setEdit({ ...edit, modal: true })}><FaCog className='text-gray-700 text-lg ' /></button>
                        </div>
                        <p className='font-bold md:text-9xl text-5xl text-gray-700'>{`${minutesDisplay}:${secondsDisplay < 10 ? '0' : ''}${secondsDisplay}`}</p>
                        <br />
                        <div className='flex justify-around w-[50%] md:flex-row flex-col'>
                            <button className={ternary ? 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 w-full' : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full'} onClick={handleStart}>{ternary ? 'PAUSE' : 'START'}</button>

                        </div>
                    </Container>
                    <Container className='w-1/2 h-full p-10'>
                        <div className='space-x-4 flex justify-center'>
                            <div className='flex flex-col items-center'>
                                <GiLaurelsTrophy className='text-5xl text-[#ffd700] ml-2' />
                                <div className='ml-4 flex flex-col items-center'>
                                    <p className='text-lg font-semibold'>2 Hour</p>
                                    <p className='text-gray-700 text-xs italic'>12 Points</p>
                                </div>
                            </div>
                            <div className='flex items-center flex-col'>
                                <GiLaurelsTrophy className='text-5xl text-[#c0c0c0] ml-2' />
                                <div className='ml-4 flex flex-col items-center'>
                                    <p className='text-lg font-semibold'>1 Hour</p>
                                    <p className='text-gray-700 text-xs italic'>5 Points</p>
                                </div>
                            </div>

                            <div className='flex items-center flex-col'>
                                <GiLaurelsTrophy className='text-5xl text-[#cd7f32] ml-2' />
                                <div className='ml-4 flex flex-col items-center'>
                                    <p className='text-lg font-semibold'>30 Minutes</p>
                                    <p className='text-gray-700 text-xs italic'>2 Points</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='italic text-xs text-gray-500'>
                            Note: The trophy will be given after you complete all rounds.
                        </div>
                    </Container>
                </div>
                <br />
                <div className='w-4/5 flex flex-col space-x-5 space-y-2  '>
                    <div className='ml-4 italic font-semibold'>History</div>
                    <div className='w-full'>
                        <div className='flex justify-around mb-2 '>
                            <div className='text-gray-500 text-sm font-medium'>Date</div>
                            <div className='text-gray-500 text-sm font-medium'>Minutes</div>
                            <div className='text-gray-500 text-sm font-medium'>Points</div>
                        </div>
                    </div>
                    {getData?.filter(item => item.userId === user._id).map((e) => {
                        return <PomorodoContainer date={dayjs(e.date).format('MMMM DD YYYY')} Minutes={`${e.minutes} Minutes`} Points={e.points} className={"w-full"} />
                    })}
                </div>
            </div>
            <Modals title={'Pomorodo Settings'} isOpen={edit.modal} onClose={(prev) => setEdit({ ...prev, modal: false, minutes: update.minutes || 25, max: update.max || 4 })}>
                <form onSubmit={handleSetting}>
                    <Input
                        type={'number'}
                        value={update.max}
                        placeholder={"Max Iteration"}
                        onChange={(e) => {
                            console.log('Updating max:', e.target.value);
                            setUpdate({ ...update, max: e.target.value });
                        }}
                    />
                    <Input
                        type={'number'}
                        value={update.minutes}
                        placeholder={"Max Minutes per Iteration"}
                        onChange={(e) => {
                            console.log('Updating minutes:', e.target.value);
                            setUpdate({ ...update, minutes: e.target.value });
                        }}
                    />

                    <SubmitBtn type={"Submit"} >Update</SubmitBtn>
                </form>
            </Modals>
        </Layout>
    );
};

export default Pomorodo;