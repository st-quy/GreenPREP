import React from "react";
import CountdownTimer from "@shared/ui/CountdownTimer";
import ReadingQuestionNavigator from "../ReadingNavigator/ReadingNavigator";
import { useReading } from "@features/reading/hooks/useReading";

const handleTimeUp = () => {
  alert("Time out!");
};

const Sidebar = () => {
  return (
    <div className="order-1 rounded-[20px] shadow-sm border border-gray-200 bg-white p-6 sticky top-0 md:w-[300px] lg:w-[300px] lg:h-[500px] lg:p-8">
      <h6 className="mb-4 font-[600] lg:text-[24px]">Time Remaining</h6>
      <CountdownTimer onTimeUp={handleTimeUp} />
      <h6 className="mb-4 font-[600] lg:text-[24px] lg:mt-4">
        Question Navigator
      </h6>
      <ReadingQuestionNavigator />
    </div>
  );
};

export default Sidebar;
