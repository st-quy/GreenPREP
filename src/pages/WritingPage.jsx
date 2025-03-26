import WritingHeader from "@features/writing/ui/WritingHeader.jsx";
import { Outlet } from "react-router-dom";

const WritingPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9]">
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <WritingHeader />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WritingPage;