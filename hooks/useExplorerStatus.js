// hooks/useExplorerStatus.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useExplorerStatus = () => {
  const [isExplorer, setIsExplorer] = useState(null);

  useEffect(() => {
    const fetchExplorerStatus = async () => {
      const value = await AsyncStorage.getItem("isExplorer");
      setIsExplorer(value);
    };
    fetchExplorerStatus();
  }, []);

  return isExplorer;
};

export default useExplorerStatus;
