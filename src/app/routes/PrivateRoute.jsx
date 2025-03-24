// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import IntroReading from "@pages/Reading/IntroductionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";

import ListeningTest from "@features/listening/components/ListeningTest";

import SpeakingPage from "@pages/SpeakingPage.jsx";
import Introduction from "@features/speaking/ui/Introduction.jsx";
import ReadingLayout from "@features/reading/ui/Layout.jsx";
import WelcomeScreen from "@pages/Welcome/WelcomeScreen.jsx";
import Layout from "@pages/Layout.jsx";
import SessionLayout from "@pages/SessionLayout";
import ListeningLayout from "@features/listening/ui/Layout";
import ListeningIntroduction from "@features/listening/ui/Introduction";
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
            element: <SpeakingPage />,
            children: [
              {
                index: true,
                element: <Introduction />,
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
