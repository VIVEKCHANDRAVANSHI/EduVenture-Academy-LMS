import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        id: '',
        email: ''
    });

    const setUserInfo = (userInfo) => {
        setUser(userInfo);
    };

    const logout = () => {
        setUser({ name: '', id: '', email: '' }); 
        localStorage.removeItem("token"); 
    };

    return (
        <UserContext.Provider value={{ user, setUser: setUserInfo, logout }}>
            {children}
        </UserContext.Provider>
    );
};
