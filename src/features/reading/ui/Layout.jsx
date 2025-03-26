import { Outlet } from "react-router-dom";
import Header from "@features/reading/ui/Header/Header";
import { ReadingProvider } from "../context/ReadingContext";

const ReadingLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] px-4 md:px-4 lg:px-16">
      <ReadingProvider>
        <Header />
        <Outlet />
      </ReadingProvider>
    </div>
  );
};

export default ReadingLayout;
