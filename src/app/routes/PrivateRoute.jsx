// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SpeakingLayout from "@pages/speaking/SpeakingLayout.jsx";
import SpeakingTransitionPage from "@pages/speaking/SpeakingTransitionPage.jsx";

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
    path: "/speaking",
    element: <SpeakingLayout />,
    children: [
      {
        path: "part/:partId/introduction",
        element: <SpeakingTransitionPage />,
      },
    ],
  },
];

export default PrivateRoute;
