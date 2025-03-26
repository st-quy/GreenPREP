import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-[1649px]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
