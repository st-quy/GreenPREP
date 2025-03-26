import HeaderGrammar from "@features/grammarvocab/components/Header";
import Header from "@pages/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-20">
      <HeaderGrammar />
      <Outlet />
    </div>
  );
};

export default Layout;
