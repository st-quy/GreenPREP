import RQuestionNavigator from "@features/reading/ui/ReadingNavigator";
import ReadingParts from "@features/reading/ui/ReadingParts/ReadingParts";
import CountdownTimer from "@shared/ui/CountdownTimer";
import React from "react";

const handleTimeUp = () => {
  alert("Time out!");
};

const ReadingTestTaking = () => {
  return (
    <div className="my-4 flex justify-between">
      <ReadingParts />
      <div className="sidebar bg-white border-2 border-gray-400 shadow-xl rounded-md lg:w-[30%] lg:h-[600px] lg:p-8">
        <h6 className="text-[20px] font-[600] mb-4">Time Remaining</h6>
        <CountdownTimer onTimeUp={handleTimeUp} />
        <h6 className="text-[20px] font-[600] mt-4">Question Navigator</h6>
      </div>
    </div>
  );
};

export default ReadingTestTaking;
