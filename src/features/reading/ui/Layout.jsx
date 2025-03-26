import { Outlet } from "react-router-dom";
import Header from "@features/reading/ui/Header/Header";
import { MarkProvider } from "../context/markContext";
import { ReadingProvider } from "../context/ReadingContext";

const ReadingLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] px-4 sm:px-8 md:px-4 lg:px-16">
      <ReadingProvider>
        <MarkProvider>
          <Header />
          <Outlet />
        </MarkProvider>
      </ReadingProvider>
    </div>
  );
};

export default ReadingLayout;
