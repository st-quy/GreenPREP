import SpeakingLayout from "@pages/speaking/SpeakingLayout";
import Introduction from "@pages/speaking/IntroductionPage";
import SpeakingTransitionPage from "@pages/speaking/SpeakingTransitionPage";

const SpeakingRoutes = [
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
];
export default SpeakingRoutes;
