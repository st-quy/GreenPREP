import { Outlet } from "react-router-dom";
import { ReadingProvider } from "../context/ReadingContext";
import Header from "./Header/Header";

const ReadingLayout = () => {
  return (
    <div className="w-full bg-[#F9F9F9] px-4 md:px-4 lg:px-16">
      <ReadingProvider>
        <Header />
        <Outlet />
      </ReadingProvider>
    </div>
  );
};

export default ReadingLayout;
