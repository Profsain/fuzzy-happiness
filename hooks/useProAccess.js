import { useState, useEffect } from 'react';
import { useLogin } from '../context/LoginProvider';

const useProAccess = (userProfile) => {
    const { isLogin, proAccess, setProAccess } = useLogin();
    console.log("User Profile", proAccess);
    // Check if the user is logged in and has pro access
    useEffect(() => {
        if (isLogin) {
            // check if user is a subscriber or pro user
            const hasProAccess = userProfile?.isSubscriber;
            setProAccess(hasProAccess);
        } else {
            setProAccess(false);
        }
    }, [isLogin, userProfile, setProAccess]);

    return proAccess;
}

export default useProAccess;