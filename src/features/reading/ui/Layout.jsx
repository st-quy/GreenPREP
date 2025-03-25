import { Outlet } from "react-router-dom";
import Header from "@features/reading/ui/Header";

const ReadingLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ReadingLayout;
