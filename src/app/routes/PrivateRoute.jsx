// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import IntroReading from "@pages/Reading/IntroductionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ReadingLayout from "@features/reading/ui/Layout.jsx";
import WelcomeScreen from "@pages/WelcomeScreen.jsx";
import Layout from "@pages/Layout.jsx";

import SpeakingRoutes from "./SpeakingRoutes.jsx";

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
        path: "reading",
        element: <ReadingLayout />,
        children: [
          {
            path: "intro",
            element: <IntroReading />,
          },
        ],
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
      ...SpeakingRoutes,
    ],
  },
];

export default PrivateRoute;
