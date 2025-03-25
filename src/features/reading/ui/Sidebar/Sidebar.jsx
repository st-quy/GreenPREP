import React from "react";
import CountdownTimer from "@shared/ui/CountdownTimer";
import RQuestionNavigator from "../ReadingNavigator";

const handleTimeUp = () => {
  alert("Time out!");
};

const Sidebar = () => {
  return (
    <div className="order-1 rounded-[20px] border border-black border-opacity-30 bg-white p-6 shadow-xl sticky top-0 md:w-[300px] lg:w-[300px] lg:h-[500px] lg:p-8">
      <h6 className="mb-4 text-[16px] font-semibold">Time Remaining</h6>
      {/* <CountdownTimer onTimeUp={handleTimeUp} /> */}
      {/* <RQuestionNavigator /> */}
    </div>
  );
};

export default Sidebar;
