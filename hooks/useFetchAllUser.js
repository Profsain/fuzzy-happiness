import { useState, useEffect } from 'react';
import { useLogin } from '../context/LoginProvider'; 

const baseUrl = process.env.BASE_URL;

const useFetchAllUsers = () => {
  const { userProfile, token } = useLogin();
  const userId = userProfile._id;
  const [userList, setUserList] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/all-users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserList(data);
      } else {
        console.log("Failed to fetch users");
      }
    } catch (error) {
      console.log("An error occurred while fetching users", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return userList;
};

export default useFetchAllUsers;
