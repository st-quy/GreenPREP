import React from 'react';
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-[1476px] h-full mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 2xl:max-w-full 2xl:px-12 2xl:py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout; 