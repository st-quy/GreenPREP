import { PublicLayout } from "@app/layout/PublicLayout";
import LoginPage from "@pages/Login";
import Register from "@pages/Register";

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
    ],
  },
];

export default PublicRoute;
