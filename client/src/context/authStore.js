import React, { createContext } from 'react';
import Cookies from 'js-cookie';
import Get from '../hooks/Get';
const api = process.env.REACT_APP_API_URL;
const id = Cookies.get('id');
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { isLoading, error, data } = Get(`${api}/user/get-user/${id}`)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
