import LoginPage from "../../features/auth/ui/LoginForm";

// Define public routes accessible to all users
import ChangePasswordPage from "@features/auth/ui/ChangePasswordForm";
import RegisterForm from "@features/auth/ui/RegisterForm";

const PublicRoute = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
  {
    path: "changepassword",
    element: <ChangePasswordPage />,
  },
];

export default PublicRoute;
