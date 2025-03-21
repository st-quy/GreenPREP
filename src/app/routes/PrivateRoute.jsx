// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ListeningTest from "@features/listening/components/ListeningTest";

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
        path: "listening",
        element: <ListeningTest />,
      }
    ],
  },
];

export default PrivateRoute;
