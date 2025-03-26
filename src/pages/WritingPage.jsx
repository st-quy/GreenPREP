import WritingHeader from "@features/writing/ui/WritingHeader.jsx";
import { Outlet } from "react-router-dom";

const WritingPage = () => {
  return (
    <div className="absolute inset-0 w-full h-screen bg-[#F9F9F9] z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-4 h-full flex flex-col">
        <WritingHeader />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WritingPage;