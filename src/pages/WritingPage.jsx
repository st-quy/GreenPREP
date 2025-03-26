import WritingHeader from "@features/writing/ui/WritingHeader.jsx";
import { Outlet } from "react-router-dom";

const WritingPage = () => {
  return (
    <div className="w-full h-screen bg-[#F9F9F9]">
      <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 md:p-6 font-sans h-full flex flex-col">
        <WritingHeader />
        <Outlet />
    </div>
  );
};

export default WritingPage; 