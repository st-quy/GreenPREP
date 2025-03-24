import GrammarPage from '@pages/GrammarPage';

// Define public routes accessible to all users

const PublicRoute = [
  {
    path: "/",
    element: <GrammarPage />,
  },
  {
    path: "login",
    element: "login",
  },
  {
    path: "grammar",
    element: <GrammarPage />,
  }
];

export default PublicRoute;
