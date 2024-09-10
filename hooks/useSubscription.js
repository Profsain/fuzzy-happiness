import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSubscription = (userProfile) => {
  const [daysLeft, setDaysLeft] = useState(null);
  const [showTrialModal, setShowTrialModal] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const isSubscribed = userProfile?.isSubscriber;
      const accountCreatedAt = new Date(userProfile?.createdAt);
      if (!isSubscribed) {
        const now = new Date();
          const daysDiff = Math.ceil((now - accountCreatedAt) / (1000 * 60 * 60 * 24));
          const trialDaysLeft = 7 - daysDiff;
        
        if (trialDaysLeft > 0) {
          setDaysLeft(trialDaysLeft);
          setShowTrialModal(true);
          setIsLocked(false);
        } else {
          setIsLocked(true);
          setShowTrialModal(true);
        }
      } else {
        setIsLocked(false);
        setShowTrialModal(false);
      }
    };

    checkSubscriptionStatus();
  }, [userProfile]);

  return { daysLeft, showTrialModal, isLocked, setShowTrialModal };
};

export default useSubscription;
