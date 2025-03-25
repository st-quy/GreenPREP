import React from 'react';
import { WaitingApprovalImg } from '@assets/images';

const WaitingApproval = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-1">
      <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-12 w-[75%] h-[80vh] max-h-[700px] text-center flex flex-col items-center justify-center space-y-4 mt-[-20px] overflow-hidden">
        {/* Hình ảnh minh họa */}
        <div className="relative">
          <img
            src={WaitingApprovalImg}
            alt="Waiting Illustration"
            className="w-40 h-40 sm:w-60 sm:h-60 md:w-[300px] md:h-auto lg:w-[337px] lg:h-auto sm:-translate-y-2 md:-translate-y-4 lg:-translate-y-6 xl:-translate-y-8"/>
        </div>
        {/* Tiêu đề */}
        <h3 className="text-2xl sm:text-3xl">
        Hold on for a <span className="max-[514px]:block">moment, please!</span>
        </h3>
        {/* Mô tả */}
        <p className="text-xs sm:text-sm md:text-base font-semibold">
          Your teacher is currently reviewing and handling your request to ensure it is processed efficiently.
        </p>
      </div>
    </div>
  );
};

export default WaitingApproval;
