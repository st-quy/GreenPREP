// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import IntroReading from "@pages/Reading/IntroductionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SpeakingPage from "@pages/SpeakingPage.jsx";
import Introduction from "@features/speaking/ui/Introduction.jsx";
import ReadingLayout from "@features/reading/ui/Layout.jsx";
import WelcomeScreen from "@pages/WelcomeScreen.jsx";
import Layout from "@pages/Layout.jsx";
// import { TestPage } from "@features/testing/ui/Test.jsx";
// import { EnterTest } from "@features/testing/ui/EnterTest.jsx";
// import { ExitTest } from "@features/testing/ui/ExitTest.jsx";

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
        element: <SpeakingPage />,
        children: [
          {
            path: "introduction",
            element: <Introduction />,
          },
        ],
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
      // {
      //   path: "enter-test",
      //   element: <EnterTest />,
      // },
      // {
      //   path: "test",
      //   element: <TestPage />,
      // },
      // {
      //   path: "exit-test",
      //   element: <ExitTest />,
      // },
    ],
  },
];

export default PrivateRoute;
