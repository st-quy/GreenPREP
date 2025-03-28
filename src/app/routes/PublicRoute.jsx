import { lazy } from "react";
import RegisterForm from "@features/auth/ui/RegisterForm"; // Define public routes accessible to all users

const PublicRoute = [
  {
    path: "login",
    element: "login",
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
];

export default PublicRoute;
