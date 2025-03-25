import Header from "@pages/Header";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
