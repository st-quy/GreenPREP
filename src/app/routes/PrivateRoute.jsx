// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SpeakingPage from "@pages/SpeakingPage.jsx";
import Introduction from "@features/speaking/ui/Introduction.jsx";

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
        path: "speaking",
        element: <SpeakingPage/>, 
        children: [
          {
            path: "introduction",
            element: <Introduction />,
          },
          {
            index: true, 
            element: <Introduction />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
