import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto pl-1 py-6 max-w-[1550px]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
