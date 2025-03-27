import { Outlet } from "react-router-dom";
import SpeakingHeader from "./SpeakingHeader";

const SpeakingLayout = () => {
  return (
    <>
      <div className="px-20 py-10 bg-gray-50 ">
        <SpeakingHeader />
        <Outlet />
      </div>
    </>
  );
};

export default SpeakingLayout;
