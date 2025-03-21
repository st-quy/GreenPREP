import { Outlet } from "react-router-dom";
import Header from "@features/reading/ui/Header";

const ReadingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9] w-full px-4 sm:px-8 md:px-32">
      <Header />
      <Outlet />
    </div>
  );
};

export default ReadingLayout;
