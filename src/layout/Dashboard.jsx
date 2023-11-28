import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdPeopleAlt, MdUnsubscribe } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-64 bg-[#8CC5D0]">
        <ul className="menu min-h-screen mt-10">
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
            <NavLink className="mb-2 text-xl" to="/">
              <FaHome className="mr-2" />
              Home
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
