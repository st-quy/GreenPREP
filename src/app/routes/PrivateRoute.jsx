// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import WritingPage from "@pages/WritingPage.jsx";

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
        path: "writingpage",
        element: <WritingPage />,
      },
    ],
  },
];

export default PrivateRoute;
