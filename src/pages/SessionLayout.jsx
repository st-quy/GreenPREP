import React from "react";
import { Outlet } from "react-router-dom";

const SessionLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SessionLayout;
