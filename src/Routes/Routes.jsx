import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import FullBlog from "../pages/Home/LatestArticles/fullBlog";
import Login from "../pages/Login/Login";

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
    ],
  },
]);

export default router;
