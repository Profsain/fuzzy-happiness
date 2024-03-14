import React, { useState } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { BillsHome, BillsGroup, BillsDetails } from "../components/splitBills";

const BillsPayScreen = () => {
  // app state
  const openAllGroups = useSelector((state) => state.openScreens.openAllGroup);
  const openGroupDetails = useSelector(
    (state) => state.openScreens.openGroupDetails
  );

  return (
    <>
      {openAllGroups ? (
        <BillsGroup />
      ) : openGroupDetails ? (
        <BillsDetails />
      ) : (
        <BillsHome />
      )}
    </>
  );
};

export default BillsPayScreen;
