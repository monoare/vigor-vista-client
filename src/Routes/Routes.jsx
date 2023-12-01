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
import UserBooking from "../pages/Trainer/UserBooking";
import Classes from "../pages/Classes/Classes";
import ClassDetails from "../pages/Classes/ClassDetails";
import Forum from "../pages/Community/Forum";
import Dashboard from "../layout/Dashboard";
import AllSubscriber from "../pages/Dashboard/AllSubscriber/AllSubscriber";
import AllTrainers from "../pages/Dashboard/AllTrainers/AllTrainers";
import Payment from "../pages/Dashboard/Payment/Payment";
import BeTrainer from "../pages/Dashboard/BeTrainer/BeTrainer";
import Balance from "../pages/Dashboard/Balance/Balance";
import AdminRoute from "./AdminRoutes";
import UserPayment from "../pages/Trainer/UserPayment";
import ManageSlots from "../pages/Dashboard/TrainerHome/ManageSlots";
import TrainerRoute from "./TrainerRoute";
import SendEmail from "../pages/Dashboard/TrainerHome/SendEmail";
import ManageMember from "../pages/Dashboard/TrainerHome/ManageMember";
import AddNewForum from "../pages/Dashboard/Shared/AddNewForum";
// import AppliedTrainerDetails from "../pages/Dashboard/BeTrainer/AppliedTrainerDetails";

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
  {
    path: "/trainerDetails/:trainerId",
    element: <TrainerDetails />,
  },
  {
    path: "/userBooking/:id",
    element: <UserBooking />,
  },
  {
    path: "/userPayment/:id",
    element: <UserPayment />,
  },
  {
    path: "/classes",
    element: <Classes />,
  },
  {
    path: "/classDetails/:classId",
    element: <ClassDetails />,
  },
  {
    path: "/forum",
    element: <Forum />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // only for admin
      {
        path: "allSubscriber",
        element: (
          <AdminRoute>
            <AllSubscriber />
          </AdminRoute>
        ),
      },
      {
        path: "allTrainers",
        element: (
          <AdminRoute>
            <AllTrainers />
          </AdminRoute>
        ),
      },
      {
        path: "payment/:trainerId",
        element: (
          <AdminRoute>
            <Payment />
          </AdminRoute>
        ),
      },
      {
        path: "appliedForTrainer",
        element: (
          <AdminRoute>
            <BeTrainer />
          </AdminRoute>
        ),
      },
      {
        path: "balance",
        element: (
          <AdminRoute>
            <Balance />
          </AdminRoute>
        ),
      },
      //only for trainer
      {
        path: "manageSlots",
        element: (
          <TrainerRoute>
            <ManageSlots />
          </TrainerRoute>
        ),
      },
      {
        path: "sendEmail/:email/:name",
        element: <SendEmail />,
      },
      {
        path: "manageMember",
        element: <ManageMember />,
      },
      {
        path: "addNewForum",
        element: <AddNewForum />,
      },
    ],
  },
]);

export default router;
