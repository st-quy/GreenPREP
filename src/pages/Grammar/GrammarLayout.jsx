import React from "react";
import { Outlet } from "react-router-dom";
import GrammarHeader from "./GrammarHeader";

const Layout = () => {
  return (
    <>
      <GrammarHeader />
      <Outlet />
    </>
  );
};

export default Layout;
