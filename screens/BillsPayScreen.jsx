import React, { useState } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import {
  BillsHome,
  BillsGroup,
  BillsDetails,
  CreateNewBills,
} from "../components/splitBills";

const BillsPayScreen = () => {
  // app state
  const openAllGroups = useSelector((state) => state.openScreens.openAllGroup);
  const openGroupDetails = useSelector(
    (state) => state.openScreens.openGroupDetails
  );
  const openCreateNewBill = useSelector(
    (state) => state.openScreens.openCreateNewBill
  );

  return (
    <>
      {openAllGroups ? (
        <BillsGroup />
      ) : openGroupDetails ? (
        <BillsDetails />
      ) : openCreateNewBill ? (
        <CreateNewBills />
      ) : (
        <BillsHome />
      )}
    </>
  );
};

export default BillsPayScreen;
