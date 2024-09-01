import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useLogin } from '../context/LoginProvider'; 

const baseUrl = process.env.BASE_URL;

const useFetchBills = () => {
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;
  const [bills, setBills] = useState([]);

  const fetchBills = useCallback(async () => { 
    try {
      const response = await fetch(`${baseUrl}/event/fetch-split-costs/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setBills(data);
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error.message));
    }
  }, [userId, token]);

  // Fetch bills data on initial load
  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return { bills, fetchBills };
};

export default useFetchBills;
