import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => { 
    const [isLogin, setIsLogin] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [token, setToken] = useState("");
    const [communityMembers, setCommunityMembers] = useState([userProfile._id]);
    const [communityData, setCommunityData] = useState({});
    const [communities, setCommunities] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [commentCount, setCommentCount] = useState(0);
    return (
        <LoginContext.Provider
            value={{
                isLogin, setIsLogin,
                userProfile, setUserProfile,
                token, setToken,
                communityMembers, setCommunityMembers, communityData, setCommunityData,
                communities, setCommunities,
                allUsers, setAllUsers,
                currentPost, setCurrentPost,
                commentCount, setCommentCount,

            }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext); 

export default LoginProvider;