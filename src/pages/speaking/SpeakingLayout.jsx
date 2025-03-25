import { Outlet } from "react-router-dom";
import SpeakingHeader from "./SpeakingHeader";

const SpeakingLayout = () => {
  return (
    <>
      <SpeakingHeader />
      <Outlet />
    </>
  );
};

export default SpeakingLayout;
