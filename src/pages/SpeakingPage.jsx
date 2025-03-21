import Introduction from "../features/speaking/ui/Introduction.jsx";
import SpeakingHeader from "@features/speaking/ui/SpeakingHeader.jsx";
import { Outlet } from "react-router-dom";

const SpeakingPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-2 bg-white max-h-screen">
      <SpeakingHeader />
      <Outlet />
    </div>
  );
};

export default SpeakingPage;
