import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const api = process.env.REACT_APP_API_URL;
const useAuthCheck = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = async () => {
            const id = Cookies.get('id');
            if (id) {
                try {
                    await axios.post(`${api}/user/auth-check/${id}`);
                } catch (error) {
                    console.error('Error checking authentication:', error);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        };
        checkAuthentication();
    }, [navigate]);
};
export default useAuthCheck;
