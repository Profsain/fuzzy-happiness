import React from "react";
import { useLogin } from "../context/LoginProvider";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const MainNavigator = () => {
  const { isLoginIn } = useLogin;
  return isLoginIn ? <AppStack /> : <AuthStack />;
};

export default MainNavigator;
