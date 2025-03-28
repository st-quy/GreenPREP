// Define public routes accessible to all users
import RegisterForm from "@features/auth/ui/RegisterForm";

const PublicRoute = [
  {
    path: "login",
    element: "login",
  },
  {
    path: "register",
    element: <RegisterForm />,
  }
];

export default PublicRoute;
