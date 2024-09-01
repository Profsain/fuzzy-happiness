const fetchUserEvents = async (userId, token) => {
    const baseUrl = process.env.BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/event/user-events/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.events;
    } else {
      const error = await response.json();
      return [];
    }
  } catch (error) {
    Alert.alert("Error", error.message || "Something went wrong");
    return [];
  }
};

export default fetchUserEvents;