import WritingHeader from "@features/writing/ui/WritingHeader.jsx";
import { Outlet } from "react-router-dom";

const WritingPage = () => {
  return (
    <div className="w-full h-screen bg-[#F9F9F9]">
        <WritingHeader />
        <Outlet />
    </div>
  );
};

export default WritingPage; 