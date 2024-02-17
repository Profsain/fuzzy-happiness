import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => { 
    const [isLoginIn, setIsLoginIn] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    return (
        <LoginContext.Provider value={{ isLoginIn, setIsLoginIn, userProfile, setUserProfile }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = useContext(LoginContext);

export default LoginProvider;