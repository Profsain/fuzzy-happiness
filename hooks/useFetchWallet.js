import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useLogin } from '../context/LoginProvider'; 

const baseUrl = process.env.BASE_URL;

const useFetchWallet = () => {
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;
  const [wallet, setWallet] = useState({});

  const fetchWallet = async () => { 
    try {
      const response = await fetch(`${baseUrl}/wallet/get-wallet/${userId}`, {
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

      setWallet(data);
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error.message));
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return wallet;
};

export default useFetchWallet;
