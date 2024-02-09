// useReceivedData.js
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

const useReceivedData = () => {
  const route = useRoute();
  const { data } = route.params;
  const [receivedData, setReceivedData] = useState("");

  useEffect(() => {
    if (data) {
      setReceivedData(data);
    }
  }, [data]);

  return receivedData;
};

export default useReceivedData;
