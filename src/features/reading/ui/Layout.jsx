import { Outlet } from "react-router-dom";
import { ReadingProvider } from "../context/ReadingContext";
import Header from "./Header/Header";

const ReadingLayout = () => {
  return (
    <div className="w-full bg-[#F9F9F9] my-10 px-20">
      <ReadingProvider>
        <Header />
        <Outlet />
      </ReadingProvider>
    </div>
  );
};

export default ReadingLayout;
