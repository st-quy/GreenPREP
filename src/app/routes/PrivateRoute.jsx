// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import WelcomeScreen from "@pages/WelcomeScreen.jsx";
import Header from "@pages/Header.jsx";

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
        path: "welcome",
        element: (
          <>
            <Header />
            <WelcomeScreen />
          </>
        ),
      },
    ],
  },
];

export default PrivateRoute;
