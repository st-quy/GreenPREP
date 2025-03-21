import React from 'react';

const WaitingApproval = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-12 w-[calc(75%)] h-[600px] sm:h-[650px] md:h-[700px] text-center flex flex-col items-center justify-center space-y-6 mx-8 transform -translate-y-1/5">
        {/* Hình ảnh minh họa */}
        <img
          src="\src\assets\Images\waiting.png"
          alt="Waiting Illustration"
          className="w-60 h-60 sm:w-72 sm:h-72 md:w-[337px] md:h-auto transform -translate-y-3"
        />
        {/* Tiêu đề */}
        <h3 className="text-2xl sm:text-3xl md:text-3xl font-inter">
          Hold on for a moment, please!
        </h3>
        {/* Mô tả */}
        <p className="text-xs sm:text-sm md:text-base font-inter font-semibold">
          Your teacher is currently reviewing and handling your request to ensure it is processed efficiently.
        </p>

      </div>
    </div>
    </>
  );
};

export default WaitingApproval;


