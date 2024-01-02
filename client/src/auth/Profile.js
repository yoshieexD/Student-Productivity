import React, { useContext } from 'react';
import { AuthContext } from '../context/authStore';
import Layout from '../Layout/Layout';
import Container from '../shared/Container';
import FriendList from '../page/FriendList';
const Profile = () => {
    const user = useContext(AuthContext);
    return (
        <Layout>
            <div className='flex flex-col items-center h-screen'>
                {/* Profile */}
                <div className='w-2/3 '>
                    <div>
                        <span className='text-blue-600 italic font-semibold text-xs'>Hello I'm</span>
                        <p className='text-2xl text-gray-700 text-semibold'>{user.userName}</p>
                    </div>
                </div>
                <br />
                {/* Friends and Hobbies */}
                <div className='w-2/3 md:h-1/4 sm:h-1/2 xs:h-1/2 xxs:h-1/2 flex md:space-x-2 xs:space-y-1  md:flex-row xs:flex-col'>
                    <Container className='md:w-1/2 h-full xs:w-full'>
                        <FriendList />
                    </Container>
                    <Container className='md:w-1/2 h-full xs:w-full'>
                    </Container>
                </div>
                {/* Points */}
                <br />
                <Container className='w-2/3 h-1/4'>
                </Container>
            </div>
        </Layout>
    );
};

export default Profile;