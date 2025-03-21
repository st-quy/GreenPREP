// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import IntroductionPage from "@pages/IntroductionPage.jsx";

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
        path: "introduction",
        element: <IntroductionPage />,
      },
    ],
  },
];

export default PrivateRoute;
