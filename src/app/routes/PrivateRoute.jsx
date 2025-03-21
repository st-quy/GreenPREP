// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import { TestPage } from "@features/testing/ui/Test.jsx";
import { EnterTest } from "@features/testing/ui/EnterTest.jsx";
import { ExitTest } from "@features/testing/ui/ExitTest.jsx";

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
        path: "enter-test",
        element: <EnterTest />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
      {
        path: "exit-test",
        element: <ExitTest />,
      },
    ],
  },
];

export default PrivateRoute;
