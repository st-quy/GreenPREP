import { PublicLayout } from "@app/layout/PublicLayout";
import ForgotPassword from "@pages/ForgotPassword";
import LoginPage from "@pages/Login";
import Register from "@pages/Register";
import ResetPassword from "@pages/ResetPassword";
import ResetSuccess from "@pages/ResetPassword/ResetSuccess";

// Define public routes accessible to all users

const PublicRoute = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "reset-success",
        element: <ResetSuccess />,
      },
    ],
  },
];

export default PublicRoute;
