import React from "react";
import CountdownTimer from "@shared/ui/CountdownTimer";
import { useNavigate } from "react-router-dom";
import ReadingQuestionNavigator from "../ReadingNavigator/ReadingNavigator";

const Sidebar = () => {
  const navigator = useNavigate();

  const handleSubmitTest = () => {
    navigator("/session/reading");
    localStorage.removeItem("countdownTime");
  };

  return (
    <div className="w-full rounded-[20px] border border-black border-opacity-30 bg-white p-6 shadow-xl sticky top-0 lg:h-[500px] xl:h-[800px] lg:p-8">
      <h6 className="mb-4 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Time Remaining
      </h6>
      <CountdownTimer initialTime={3000} onSubmit={handleSubmitTest} />
      <h6 className="mb-4 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl lg:mt-4">
        Question Control
      </h6>
      <ReadingQuestionNavigator />
    </div>
  );
};

export default Sidebar;
