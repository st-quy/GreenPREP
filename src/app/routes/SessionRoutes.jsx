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
        // Thêm các màn hình con khác của listening ở đây
        // {
        //   path: "practice",
        //   element: <ListeningPractice />,
        // },
        // {
        //   path: "test",
        //   element: <ListeningTest />,
        // }
      ],
    },
    // Các route khác của session
    // {
    //   path: "speaking",
    //   element: <SpeakingLayout />,
    //   children: [...],
    // },
    // {
    //   path: "reading",
    //   element: <ReadingLayout />,
    //   children: [...],
    // },
    // {
    //   path: "writing",
    //   element: <WritingLayout />,
    //   children: [...],
    // },
    // {
    //   path: "grammar",
    //   element: <GrammarLayout />,
    //   children: [...],
    // }
  ],
};

export default SessionRoutes;
