import { Link, NavLink } from "react-router-dom";
import title from "../../assets/image/Title-removebg.png";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, LogOut } = useAuth();
  const navLinks = (
    <>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? "text-[#8CC5D0] font-semibold text-lg md:text-xl lg:text-2xl ml-4 md:ml-0"
            : isPending
            ? "text-white text-lg md:text-xl lg:text-2xl ml-4 md:ml-0"
            : "text-lg md:text-xl lg:text-2xl ml-4 md:ml-0"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? "text-[#8CC5D0] font-semibold text-lg md:text-xl lg:text-2xl ml-4"
            : isPending
            ? "text-white text-lg md:text-xl lg:text-2xl ml-4"
            : "text-lg md:text-xl lg:text-2xl ml-4"
        }
        to="/gallery"
      >
        Gallery
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? "text-[#8CC5D0] font-semibold text-lg md:text-xl lg:text-2xl ml-4"
            : isPending
            ? "text-white text-lg md:text-xl lg:text-2xl ml-4"
            : "text-lg md:text-xl lg:text-2xl ml-4"
        }
        to="/trainer"
      >
        Trainer
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? "text-[#8CC5D0] font-semibold text-lg md:text-xl lg:text-2xl ml-4"
            : isPending
            ? "text-white text-lg md:text-xl lg:text-2xl ml-4"
            : "text-lg md:text-xl lg:text-2xl ml-4"
        }
        to="/classes"
      >
        Classes
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? "text-[#8CC5D0] font-semibold text-lg md:text-xl lg:text-2xl ml-4"
            : isPending
            ? "text-white text-lg md:text-xl lg:text-2xl ml-4"
            : "text-lg md:text-xl lg:text-2xl ml-4"
        }
        to="/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive
            ? "text-[#8CC5D0] font-semibold text-lg md:text-xl lg:text-2xl ml-4"
            : isPending
            ? "text-white text-lg md:text-xl lg:text-2xl ml-4"
            : "text-lg md:text-xl lg:text-2xl ml-4"
        }
        to="/community"
      >
        Community
      </NavLink>
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-40 text-white bg-black max-w-screen-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-500 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link className="hidden md:block" to="/">
          <img className="h-20" src={title} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end mr-4">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring ring-primary"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-400 rounded-box w-32"
              >
                <p className="pl-3 text-green-800 font-semibold">
                  User: {user.displayName}
                </p>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={LogOut}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/signUp">
              <button className="btn btn-ghost">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
