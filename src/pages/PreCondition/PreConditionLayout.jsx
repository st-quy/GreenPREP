import { Outlet } from "react-router-dom";

const PreConditionLayout = () => {
  return (
    <>
      <div className="px-20 py-10">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3658F9]">Pre-Condition</h1>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default PreConditionLayout;
