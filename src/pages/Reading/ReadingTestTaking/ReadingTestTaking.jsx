import RQuestionNavigator from "@features/reading/ui/ReadingNavigator/ReadingNavigator";
import ReadingParts from "@features/reading/ui/ReadingParts/ReadingParts";
import Sidebar from "@features/reading/ui/Sidebar/Sidebar";
import React from "react";

const ReadingTestTaking = () => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row lg:flex-row lg:mt-4">
      <ReadingParts />
      <Sidebar />
    </div>
  );
};

export default ReadingTestTaking;
