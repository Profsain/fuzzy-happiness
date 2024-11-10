// hooks/useExplorerStatus.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useExplorerStatus = () => {
  const [isExplorer, setIsExplorer] = useState(false);

  useEffect(() => {
    const fetchExplorerStatus = async () => {
      const value = await AsyncStorage.getItem("isExplorer");
      setIsExplorer(value === "true");
    };
    fetchExplorerStatus();
  }, []);

  return isExplorer;
};

export default useExplorerStatus;
