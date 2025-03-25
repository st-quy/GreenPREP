import WritingHeader from "@features/writing/ui/WritingHeader.jsx";
import { Outlet } from "react-router-dom";

const WritingPage = () => {
  return (
    <>
      <WritingHeader />
      <Outlet />
    </>
  );
};
export default WritingPage;
