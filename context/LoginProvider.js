import React, { createContext, useContext, useState } from "react";
// create context instance
const LoginContext = createContext();

// create provider component
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
    const [pushNotification, setPushNotification] = useState([]);
    const [adverts, setAdverts] = useState([]);
    const [promoCodes, setPromoCodes] = useState([]);
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    // subscription lock
    const [daysLeft, setDaysLeft] = useState(null);
    const [showTrialModal, setShowTrialModal] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

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
                pushNotification, setPushNotification,
                adverts, setAdverts,
                promoCodes, setPromoCodes,
                subscriptionPlans, setSubscriptionPlans,
                daysLeft, setDaysLeft,
                showTrialModal, setShowTrialModal,
                isLocked, setIsLocked,
            }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext); 

export default LoginProvider;