// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import IntroReading from "@pages/Reading/IntroductionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ListeningTest from "@features/listening/components/ListeningTest";
import ReadingLayout from "@features/reading/ui/Layout.jsx";
import WelcomeScreen from "@pages/WelcomeScreen.jsx";
import Layout from "@pages/Layout.jsx";
import SessionLayout from "@pages/SessionLayout";
import ListeningLayout from "@features/listening/ui/Layout";
import ListeningIntroduction from "@features/listening/ui/Introduction";
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
        path: "session",
        children: [
          {
            path: "listening",
            children: [
              {
                path: "test",
                element: <ListeningTest />,
              },
            ],
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
        path: "session",
        element: <SessionLayout />,
        children: [
          {
            path: "listening",
            element: <ListeningLayout />,
            children: [
              {
                index: true,
                element: <ListeningIntroduction />,
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
          {
            path: "reading",
            element: <ReadingLayout />,
            children: [
              {
                index: true,
                element: <IntroReading />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
