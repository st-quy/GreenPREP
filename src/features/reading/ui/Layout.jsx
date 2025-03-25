import { Outlet } from "react-router-dom";
import Header from "@features/reading/ui/Header/Header";
import { MarkProvider } from "../context/markContext";

const ReadingLayout = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] w-full px-4 sm:px-8 md:px-16">
      <MarkProvider>
        <Header />
        <Outlet />
      </MarkProvider>
    </div>
  );
};

export default ReadingLayout;
