import WritingHeader from "@features/writing/ui/WritingHeader.jsx";
import { Outlet } from "react-router-dom";

const WritingLayout = () => {
  return (
    <div className="px-20">
      <WritingHeader />
      <Outlet />
    </div>
  );
};

export default WritingLayout;
