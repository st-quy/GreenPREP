import { Outlet } from "react-router-dom";

const SessionLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9] w-full px-4 sm:px-8 md:px-32 pt-10">
      <Outlet />
    </div>
  );
};

export default SessionLayout;
