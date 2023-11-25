import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import FullBlog from "../pages/Home/LatestArticles/fullBlog";
import Login from "../pages/Login/Login";
import Gallery from "../pages/Gallery/Gallery";
import Trainer from "../pages/Trainer/Trainer";
import BeATrainer from "../pages/Trainer/BeATrainer";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp/SignUp";
import TrainerDetails from "../pages/Trainer/TrainerDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fullBlog/:id",
        element: <FullBlog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/trainer",
    element: <Trainer />,
  },
  {
    path: "/beATrainer",
    element: (
      <PrivateRoute>
        <BeATrainer />
      </PrivateRoute>
    ),
  },
  { path: "/trainerDetails", element: <TrainerDetails /> },
]);

export default router;
