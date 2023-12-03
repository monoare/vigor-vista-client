import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  MdPeopleAlt,
  MdUnsubscribe,
  MdOutlineForum,
  MdOutlineRecommend,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FiActivity } from "react-icons/fi";
import { FcOvertime } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import useTrainer from "../Hooks/useTrainer";
import useAuth from "../Hooks/useAuth";
import useMember from "../Hooks/useMember";

const Dashboard = () => {
  const [isTrainer] = useTrainer();
  const [isMember] = useMember();
  const { user } = useAuth();
  const email = user?.email;
  const admin = "a@b.com";
  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-64 bg-[#8CC5D0]">
        <ul className="menu min-h-screen mt-10">
          {admin === email && (
            <>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/allSubscriber">
                  <MdUnsubscribe className="mr-2" />
                  All Subscriber
                </NavLink>
              </li>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/allTrainers">
                  <MdPeopleAlt className="mr-2" />
                  All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="mb-2 text-xl"
                  to="/dashboard/appliedForTrainer"
                >
                  <MdPeopleAlt className="mr-2" />
                  Be A Trainer
                </NavLink>
              </li>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/balance">
                  <MdPeopleAlt className="mr-2" />
                  Balance
                </NavLink>
              </li>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/addNewForum">
                  <MdPeopleAlt className="mr-2" />
                  Add New Forum
                </NavLink>
              </li>
            </>
          )}
          {isTrainer === "Trainer" && (
            <>
              <p className="text-xl font-bold mb-2 text-center">
                Welcome {user?.displayName ? user?.displayName : ""}!
              </p>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/manageSlots">
                  <FcOvertime className="mr-2" />
                  Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/manageMember">
                  <MdPeopleAlt className="mr-2" />
                  Manage Member
                </NavLink>
              </li>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/addNewForum">
                  <MdOutlineForum className="mr-2" />
                  Add New Forum
                </NavLink>
              </li>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/addNewClass">
                  <SiGoogleclassroom className="mr-2" />
                  Add New Class
                </NavLink>
              </li>
            </>
          )}

          {isMember === "Member" && (
            <>
              <p className="text-xl font-bold mb-2 text-center">
                Welcome {user?.displayName ? user?.displayName : ""}!
              </p>
              <li>
                <NavLink className="mb-2 text-xl" to="/dashboard/activityLog">
                  <FiActivity className="mr-2" />
                  Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="mb-2 text-xl"
                  to="/dashboard/profileSetting"
                >
                  <IoSettings className="mr-2" />
                  Profile Setting
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="mb-2 text-xl"
                  to="/dashboard/recommendedClasses"
                >
                  <MdOutlineRecommend className="mr-2" />
                  Recommended Classes
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink className="mb-2 text-xl" to="/">
              <FaHome className="mr-2" />
              Go to Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
