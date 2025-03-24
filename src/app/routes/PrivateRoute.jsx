// import { lazy } from 'react';
import IntroReading from "@pages/Reading/IntroductionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";



import GrammarPage from "@pages/GrammarPage";

import ListeningTest from "@features/listening/components/ListeningTest";
import ReadingLayout from "@features/reading/ui/Layout.jsx";
import WelcomeScreen from "@pages/Welcome/WelcomeScreen.jsx";
import LayoutWelcome from "@pages/Layout.jsx";
import SessionLayout from "@pages/SessionLayout";
import ListeningLayout from "@features/listening/ui/Layout";
import ListeningIntroduction from "@features/listening/ui/Introduction";
import SpeakingLayout from "@pages/speaking/SpeakingLayout";
import Introduction from "@pages/speaking/IntroductionPage";
import SpeakingTransitionPage from "@pages/speaking/SpeakingTransitionPage";
import WritingPage from "@pages/WritingPage.jsx";
import IntroWriting from "@features/writing/ui/IntroWriting.jsx";
import WaitingApproval from "@pages/WaitingApproval.jsx";


const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <WelcomeScreen />,
      },
      {
        path: "waiting-approval",
        element: <WaitingApproval />
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
              {
                path: "test",
                element: <ListeningTest />,
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
          {
            path: "writing",
            element: <WritingPage />,
            children: [
              {
                index: true,
                element: <IntroWriting />,
              },
            ],
          },
          {
            path: "grammar",
            element: <GrammarPage />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
