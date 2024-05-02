import React, { useState } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import {
  BillsHome,
  BillsGroup,
  BillsDetails,
  CreateNewBills,
  TransactionScreen,
  TransactionHistory,
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
  const openTransactionScreen = useSelector(
    (state) => state.openScreens.openTransactionScreen
  );
  const openTransactionHistory = useSelector((state) => state.openScreens.openTransactionHistory);

  return (
    <>
      {openAllGroups ? (
        <BillsGroup />
      ) : openGroupDetails ? (
        <BillsDetails />
      ) : openCreateNewBill ? (
        <CreateNewBills />
      ) : openTransactionScreen ? (
        <TransactionScreen />
      ) : openTransactionHistory ? (<TransactionHistory />) : (
        <BillsHome />
      )}
    </>
  );
};

export default BillsPayScreen;
