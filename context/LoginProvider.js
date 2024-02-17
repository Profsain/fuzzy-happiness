import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => { 
    const [isLoginIn, setIsLoginIn] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [token, setToken] = useState("");

    return (
        <LoginContext.Provider value={{ isLoginIn, setIsLoginIn, userProfile, setUserProfile, token, setToken }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext); 

export default LoginProvider;