import bannerImg from "../../../assets/image/spartan.jpg";
import { HiArrowTrendingUp } from "react-icons/hi2";

const Banner = () => {
  return (
    <div>
      <div
        className="hero h-2/3 object-cover"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content mb-10">
          <div className="mt-40 ml-10">
            <h1 className="mb-8  text-5xl font-bold ">
              Train like <span className="text-[#8CC5D0]">spartaan</span>,{" "}
              <br />
              grow more stronger
            </h1>
            <p className="mb-5 text-2xl w-1/2">
              Elevate your fitness journey with cutting-edge workouts and
              personalized training programs, sculpting a stronger, healthier
              you
            </p>
            <div className="flex items-center mb-5">
              <div className="cursor-pointer flex items-center ">
                Register <br /> Now{" "}
                <HiArrowTrendingUp className="text-red-600 text-3xl" />
              </div>
              <div className="divider-vertical border mx-4 h-10"></div>
              <div className="w-1/3">
                Focus on strength your muscles to improve posture & stability
              </div>
            </div>
            <button className="btn btn-primary px-5">Classes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
