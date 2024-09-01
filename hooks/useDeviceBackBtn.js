import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (callbacks) => {

  useEffect(() => {
    const backAction = () => {
      callbacks.forEach(callback => callback());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [callbacks]);
};

export default useBackHandler;
