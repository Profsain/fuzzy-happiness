import React, { useState } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { BillsHome, BillsGroup } from "../components/splitBills";

const BillsPayScreen = () => {
  // app state
  const openAllGroups = useSelector((state) => state.openScreens.openAllGroup); 

  return <>{openAllGroups ? <BillsGroup /> : <BillsHome />}</>;
};

export default BillsPayScreen;
