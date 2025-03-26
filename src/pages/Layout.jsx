import Header from "@pages/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-20">
      <Outlet />
    </div>
  );
};

export default Layout;
