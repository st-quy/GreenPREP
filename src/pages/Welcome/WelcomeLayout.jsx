import Header from "@pages/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function WelcomeLayout() {
  const location = useLocation();
  const isWelcomeScreen = location.pathname === "/"; // Adjust the path as needed

  return (
    <>
      
      <Header />
      <div className={isWelcomeScreen ? "" : "p-10"}>
        <Outlet />
      </div>
    </>
  );
}
