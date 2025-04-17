import Header from "@pages/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function WelcomeLayout() {
  const location = useLocation();
  const isWelcomeScreen = location.pathname === "/"; // Adjust the path as needed
  const isProfileScreen = location.pathname === "/profile"; // Adjust the path as needed

  return (
    <div className={isProfileScreen ? "" : "!bg-[#FCFCFC] min-h-screen"}>
      <Header />
      <div className={isWelcomeScreen ? "" : "p-10"}>
        <Outlet />
      </div>
    </div>
  );
}
