import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ReadingTestTaking from "@pages/Reading/ReadingTestTaking/ReadingTestTaking.jsx";
import RejectedRequestPage from "@pages/Welcome/RejectedRequestPage.jsx";
import IntroductionPage from "@pages/Welcome/IntroductionPage.jsx";
import ProfileLayout from "@pages/ProfileUser/ProfileLayout";
const ProfileUser = lazy(
  () => import("@pages/ProfileUser/ProfileUser.jsx")
);


const IntroReading = lazy(
  () => import("@pages/Reading/IntroductionScreen.jsx")
);
const GrammarPage = lazy(() => import("@pages/GrammarVocab/GrammarPage.jsx"));
const GrammarVocabTest = lazy(
  () => import("@pages/GrammarVocab/GrammarVocabTest.jsx")
);
const GVSubmissionSuccess = lazy(
  () => import("@pages/GrammarVocab/GVSubmissionSuccess.jsx")
);

const ListeningTest = lazy(
  () => import("@features/listening/components/ListeningTest")
);
const ReadingLayout = lazy(() => import("@features/reading/ui/Layout.jsx"));
const WelcomeScreen = lazy(() => import("@pages/Welcome/WelcomeScreen.jsx"));
const WaitingApproval = lazy(
  () => import("@pages/Welcome/WaitingApproval.jsx")
);
const SessionLayout = lazy(() => import("@pages/SessionLayout"));
const ListeningLayout = lazy(() => import("@features/listening/ui/Layout"));
const ListeningIntroduction = lazy(
  () => import("@features/listening/ui/Introduction")
);
const ListeningSubmissionSuccess = lazy(
  () => import("@pages/Listening/ListeningSubmissionSuccess.jsx")
);
const SpeakingLayout = lazy(() => import("@pages/speaking/SpeakingLayout"));
const Introduction = lazy(() => import("@pages/speaking/IntroductionPage"));
const SpeakingTransitionPage = lazy(
  () => import("@pages/speaking/SpeakingTransitionPage")
);
const WritingLayout = lazy(() => import("@pages/Writing/WritingLayout.jsx"));
const WritingTest = lazy(() => import("@pages/Writing/WritingTest.jsx"));
const WritingSubmissionSuccess = lazy(
  () => import("@pages/Writing/WritingSubmissionSuccess.jsx")
);

const SessionInformation = lazy(
  () => import("@pages/ProfileUser/ProfileUser.jsx")
);

const IntroWriting = lazy(
  () => import("@features/writing/ui/IntroWriting.jsx")
);
const WelcomeLayout = lazy(() => import("@pages/Welcome/WelcomeLayout.jsx"));
const SpeakingTests = lazy(() => import("@pages/speaking/SpeakingTests.jsx"));
const SpeakingSubmissionSucces = lazy(
  () => import("@pages/speaking/SpeakingSubmissionSuccess.jsx")
);

import Layout from "@pages/Layout.jsx";
import TestingMicrophone from "@features/speaking/ui/TestingMicrophone.jsx";
import PreConditionLayout from "@pages/PreCondition/PreConditionLayout.jsx";
import ReadingSuccess from "@pages/Reading/ReadingSuccess/ReadingSuccess.jsx";


const ResetPasswordSuccessfullyLayout = lazy(() => import("@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyLayout"));
const ResetPasswordSuccessfullyPage = lazy(() => import("@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyPage"));

const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [ 
      {
        path: "",
        element: <WelcomeLayout />,       
        children: [
          { index: true, element: <WelcomeScreen /> },
          {
            path: "waiting-for-approval",
            element: <WaitingApproval />,
          },
          {
            path: "introduction",
            element: <IntroductionPage />,
          },
          {
            path: "profile",
            element: <ProfileLayout />,
            children: [
              {
                path: "",
                element: <ProfileUser />,
              },
            ],
          },
        ],
      },
      
      {
        path: "reset-password-successfully",
        element: <ResetPasswordSuccessfullyLayout />,
        children: [
          {
            index: true,
            element: <ResetPasswordSuccessfullyPage />,
          },
        ],
      },
      {
        path: "pre-condition",
        element: <PreConditionLayout />,
        children: [
          {
            path: "",
            element: <TestingMicrophone />,
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
              {
                path: "test",
                element: <ListeningTest />,
              },
              {
                path: "submission",
                element: <ListeningSubmissionSuccess />,
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
              {
                path: "test/:partId/question/:questionsId",
                element: <SpeakingTests />,
              },
              {
                path: "submission",
                element: <SpeakingSubmissionSucces />,
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
              {
                path: "reading-test",
                element: <ReadingTestTaking />,
              },
              {
                path: "reading-success",
                element: <ReadingSuccess />,
              },
            ],
          },
          {
            path: "writing",
            element: <WritingLayout />,
            children: [
              {
                index: true,
                element: <IntroWriting />,
              },
              {
                path: "test",
                element: <WritingTest />,
              },
              {
                path: "submission",
                element: <WritingSubmissionSuccess />,
              },
            ],
          },
          {
            path: "grammar",
            element: <Layout />,
            children: [
              {
                index: true,
                element: <GrammarPage />,
              },
              {
                path: "test",
                element: <GrammarVocabTest />,
              },
              {
                path: "submission",
                element: <GVSubmissionSuccess />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default PrivateRoute;
