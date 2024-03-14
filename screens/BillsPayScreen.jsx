import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BillsHome } from "../components/splitBills";

const BillsPayScreen = () => {
  // app state
  const openAllGroups = useSelector((state) => state.openScreens.openAllGroup);

  console.log("Global state", openAllGroups)
 

  return (
    <>
      <BillsHome />
    </>
  );
};

export default BillsPayScreen;
