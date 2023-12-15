import React from 'react';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { useLocation } from 'react-router-dom';
const Home = () => {
    const location = useLocation();
    return (
        <div>
            <div className=' h-screen place-items-center grid md:grid-cols-2 xs:grid-cols-1'>
                <div>
                    Banner
                </div>
                {location.pathname === "/register" && (<Register />)}
                {location.pathname === "/" && (<Login />)}
            </div>
        </div>
    );
};

export default Home;