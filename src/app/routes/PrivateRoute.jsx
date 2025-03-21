// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import { element } from "prop-types";
import Waiting from "@pages/WaitingApproval.jsx";
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
        path: "waiting-approval",
        element: <Waiting />
      }
    ],
  },
];

export default PrivateRoute;
