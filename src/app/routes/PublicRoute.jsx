import ForgotPasswordForm from "@features/auth/ui/ForgotPasswordForm";
import LoginPage from "../../features/auth/ui/LoginForm";
import {PublicLayout} from "../layout/PublicLayout";

import RegisterForm from "@features/auth/ui/RegisterForm";
import ResetPasswordSuccessfullyPage from "@features/auth/ui/ResetPasswordSuccessfullyPage";

const PublicRoute = [
  {
    path:"/",
    element:<PublicLayout />,
    children: [
      {
        path: "login",
         element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      }, 
      {
        path: "forgot-password",
        element: <ForgotPasswordForm />,
      },
      {
        path: "reset-password-success",
        element: <ResetPasswordSuccessfullyPage />,
      },
    ],
  },
]
export default PublicRoute;
