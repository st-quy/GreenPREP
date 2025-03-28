import LoginPage from "../../features/auth/ui/LoginForm";

// Define public routes accessible to all users

const PublicRoute = [
  {
    path: "login",
    element: <LoginPage />,
  },
];

export default PublicRoute;
