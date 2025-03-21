// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import WelcomeScreen from "@pages/WelcomeScreen.jsx";
import Layout from "@pages/Layout.jsx";

const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "homepage",
        element: <HomePage />,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "welcome",
            element: <WelcomeScreen />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
