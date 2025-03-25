import { Outlet } from "react-router-dom";
import SpeakingHeader from "./SpeakingHeader";

const SpeakingLayout = () => {
  return (
    <>
      <div className="px-8 md:px-16 min-h-screen bg-gray-50 ">
        <SpeakingHeader />
        <Outlet />
      </div>
    </>
  );
};

export default SpeakingLayout;
