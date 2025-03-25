import Header from "@pages/Header";
import { Outlet } from "react-router-dom";

export default function WelcomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
