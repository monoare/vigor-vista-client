import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdUnsubscribe } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-64 min-h-full bg-[#8CC5D0]">
        <ul className="menu mt-10">
          <li>
            <NavLink className="pb-2 text-xl" to="/">
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="pb-2 text-xl" to="/dashboard/allSubscriber">
              <MdUnsubscribe className="mr-2" />
              All Subscriber
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
