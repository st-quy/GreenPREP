// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import GrammarPage from '@pages/GrammarPage';

const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "homepage",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/grammar",
    element: <GrammarPage />,
  }
];

export default PrivateRoute;
