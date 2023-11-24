import { Link, NavLink } from "react-router-dom";
import title from "../../assets/image/Title-removebg.png";
const Navbar = () => {
  const navLinks = (
    <>
      <NavLink
        className={(isActive) =>
          isActive ? "text-[#8CC5D0] font-semibold text-2xl" : "text-2xl"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={`(isActive) => (isActive ? "text-[#8CC5D0] font-semibold" : "") ml-4 text-2xl`}
        to="/gallery"
      >
        Gallery
      </NavLink>
      <NavLink
        className={`(isActive) => (isActive ? "text-[#8CC5D0] font-semibold" : "") ml-4 text-2xl`}
        to="/"
      >
        Trainer
      </NavLink>
      <NavLink
        className={`(isActive) => (isActive ? "text-[#8CC5D0] font-semibold" : "") ml-4 text-2xl`}
        to="/"
      >
        Classes
      </NavLink>
      <NavLink
        className={`(isActive) => (isActive ? "text-[#8CC5D0] font-semibold" : "") ml-4 text-2xl`}
        to="/"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={`(isActive) => (isActive ? "text-[#8CC5D0] font-semibold" : "") ml-4 text-2xl`}
        to="/"
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
        <button className="btn btn-ghost">Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
