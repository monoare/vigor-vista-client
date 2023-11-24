import logo from "../../assets/image/logo-removebg.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer px-10 pt-10 bg-base-300 text-base-content">
        <aside>
          <img src={logo} alt="" />
          <p className="text-[#8CC5D0] text-xl font-semibold">Vigor Vista</p>
        </aside>
        <nav>
          <header className="footer-title">Our gyms</header>
          <a className="link link-hover">Fitness Classes</a>
          <a className="link link-hover">Personal trainers</a>
          <a className="link link-hover">Student Gym Membership</a>
          <a className="link link-hover">Gym Membership Deals & Offers</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <p className="footer footer-center bg-base-300 text-base-content py-4">
        Copyright © 2023 - All right reserved by Vigor Vista
      </p>
    </div>
  );
};

export default Footer;
