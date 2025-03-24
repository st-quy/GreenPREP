// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import IntroReading from "@pages/Reading/IntroductionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SpeakingPage from "@pages/SpeakingPage.jsx";
import Introduction from "@features/speaking/ui/Introduction.jsx";
import ReadingLayout from "@features/reading/ui/Layout.jsx";
import WelcomeScreen from "@pages/WelcomeScreen.jsx";
import Layout from "@pages/Layout.jsx";
import ListeningLayout from "@features/listening/ui/Layout.jsx";
import ListeningIntroduction from "@features/listening/ui/Introduction.jsx";

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
      {
        path: "listening",
        element: <ListeningLayout />,
        children: [
          {
            path: "introduction",
            element: <ListeningIntroduction />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
