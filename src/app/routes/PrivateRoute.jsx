import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import RejectedRequestPage from "@pages/Welcome/RejectedRequestPage.jsx";

const IntroReading = lazy(
  () => import("@pages/Reading/IntroductionScreen.jsx")
);
const GrammarPage = lazy(() => import("@pages/GrammarPage"));
const ListeningTest = lazy(
  () => import("@features/listening/components/ListeningTest")
);
const ReadingLayout = lazy(() => import("@features/reading/ui/Layout.jsx"));
const WelcomeScreen = lazy(() => import("@pages/Welcome/WelcomeScreen.jsx"));
const WaitingApproval = lazy(() => import("@pages/Welcome/WaitingApproval.jsx"));
const SessionLayout = lazy(() => import("@pages/SessionLayout"));
const ListeningLayout = lazy(() => import("@features/listening/ui/Layout"));
const ListeningIntroduction = lazy(
  () => import("@features/listening/ui/Introduction")
);
const SpeakingLayout = lazy(() => import("@pages/speaking/SpeakingLayout"));
const Introduction = lazy(() => import("@pages/speaking/IntroductionPage"));
const SpeakingTransitionPage = lazy(
  () => import("@pages/speaking/SpeakingTransitionPage")
);
const WritingPage = lazy(() => import("@pages/WritingPage.jsx"));
const IntroWriting = lazy(
  () => import("@features/writing/ui/IntroWriting.jsx")
);
const WelcomeLayout = lazy(() => import("@pages/Welcome/WelcomeLayout.jsx"));

const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <WelcomeLayout />,
        children: [{ index: true, element: <WelcomeScreen /> },
                    {
                      path: "waiting-for-approval",
                      element: <WaitingApproval />,
                     }
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
              {
                path: "test",
                element: <ListeningTest />,
              },
            ],
          },
          {
            path: "rejected",
            element: <RejectedRequestPage />,
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
