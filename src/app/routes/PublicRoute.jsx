// Define public routes accessible to all users
import ChangePasswordPage from "@features/auth/ui/ChangePasswordForm";
import RegisterForm from "@features/auth/ui/RegisterForm";

const PublicRoute = [
  {
    path: "login",
    element: "login",
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
