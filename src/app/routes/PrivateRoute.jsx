// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import IntroReading from "@pages/Reading/IntroductionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ReadingLayout from "@features/reading/ui/Layout.jsx";
import WelcomeScreen from "@pages/WelcomeScreen.jsx";
import Layout from "@pages/Layout.jsx";
import SpeakingLayout from "@pages/speaking/SpeakingLayout";
import Introduction from "@pages/speaking/IntroductionPage";
import SpeakingTransitionPage from "@pages/speaking/SpeakingTransitionPage";
import WritingPage from "@pages/WritingPage.jsx";
import IntroWriting from "@features/writing/ui/IntroWriting.jsx";

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
        path: "writing",
        element: <WritingPage />,
        children: [
          {
            path: "intro",
            element: <IntroWriting />,
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
      {
        path: "speaking",
        element: <SpeakingLayout />,
        children: [
          {
            index: true,
            element: <Introduction />,
          },
          {
            path: "part/:partId/introduction",
            element: <SpeakingTransitionPage />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
