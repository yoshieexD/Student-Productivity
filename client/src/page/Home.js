import React from 'react';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPass from '../auth/ForgotPass';
import { useLocation } from 'react-router-dom';
const Home = () => {
    const location = useLocation();
    return (
        <div>
            <div className=' h-screen place-items-center grid md:grid-cols-2 xs:grid-cols-1'>
                <div className='bg-black h-full w-full md:block xs:hidden sm:hidden xxs:hidden'>
                    <img src='https://i.pinimg.com/originals/3c/85/e2/3c85e2399417f8743a3bf83720571861.jpg' alt='school'
                        className='bg-no-repeat w-full h-full filter grayscale transition duration-300 ease-in-out'
                    />
                </div>
                {location.pathname === "/register" && (<Register />)}
                {location.pathname === "/" && (<Login />)}
                {location.pathname === "/forgot-password" && (<ForgotPass />)}
            </div>
        </div>
    );
};

export default Home;