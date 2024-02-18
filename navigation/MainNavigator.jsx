import React from "react";
import { useLogin } from "../context/LoginProvider";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import TabNavigation from "./TabNavigation";

const MainNavigator = () => {
  const { isLogin } = useLogin;
  return isLogin ? <TabNavigation /> : <AuthStack />;
};

export default MainNavigator;
