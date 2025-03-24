import SessionLayout from "@pages/SessionLayout";
import ListeningLayout from "@features/listening/ui/Layout";
import ListeningIntroduction from "@features/listening/ui/Introduction";

const SessionRoutes = {
  path: "session",
  element: <SessionLayout />,
  children: [
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
};

export default SessionRoutes;
