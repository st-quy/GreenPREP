// @ts-nocheck
import React, { useEffect, useState } from "react";
import { WaitingApprovalImg } from "@assets/images";
import { useNavigate } from "react-router-dom";

const WaitingApproval = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/introduction"); // Replace with your target page path
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className=" bg-gray-100 flex justify-center">
      <div className="bg-white rounded-lg shadow-2xl text-center flex flex-col justify-center overflow-hidden p-20">
        <div className="relative">
          <img
            src={WaitingApprovalImg}
            alt="Waiting Illustration"
            className="w-40 h-40 sm:w-60 sm:h-60 md:w-[300px] md:h-auto lg:w-[337px] lg:h-auto sm:-translate-y-2 md:-translate-y-4 lg:-translate-y-6 xl:-translate-y-8"
          />
        </div>
        {/* Tiêu đề */}
        <h3 className="text-2xl sm:text-3xl">
          Hold on for a{" "}
          <span className="max-[514px]:block">moment, please!</span>
        </h3>
        {/* Mô tả */}
        <p className="text-xs sm:text-sm md:text-base font-semibold">
          Your teacher is currently reviewing and handling your request to
          ensure it is processed efficiently.
        </p>
      </div>
    </div>
  );
};

export default WaitingApproval;
