import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/image/logo-removebg.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="flex justify-between px-2 md:px-10 pt-2 md:pt-10 bg-base-300 text-base-content">
        <aside>
          <img className="w-1/2 md:w-auto" src={logo} alt="" />
          <p className="text-[#8CC5D0] text-[10px] md:text-xl md:font-semibold">
            Vigor Vista
          </p>
          <div className="flex gap-4 mt-2  md:text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
          </div>
        </aside>
        <nav className="flex flex-col text-[10px] md:text-base">
          <header className="md:font-semibold uppercase">Our gyms</header>
          <a className="link link-hover">Fitness Classes</a>
          <a className="link link-hover">Personal trainers</a>
          <a className="link link-hover">Student Gym Membership</a>
          <a className="link link-hover">Gym Membership Deals & Offers</a>
        </nav>
        <nav className="flex flex-col text-[10px] md:text-base">
          <header className="md:font-semibold uppercase">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="flex flex-col ml-2 md:ml-0 text-[10px] md:text-base">
          <header className="md:font-semibold uppercase">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <p className="footer footer-center bg-base-300 text-[10px] md:text-sm md:text-base-content md:py-4">
        Copyright © 2023 - All right reserved by Vigor Vista
      </p>
    </div>
  );
};

export default Footer;
