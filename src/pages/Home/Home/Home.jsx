import AboutSection from "../About/About";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import FeaturedClasses from "../FeaturedClasses/FeaturedClasses";
import LatestArticles from "../LatestArticles/LatestArticles";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-350px)]">
      <Banner />
      <Featured />
      <hr />
      <AboutSection />
      <hr />
      <FeaturedClasses />
      <hr />
      <Testimonials />
      <hr />
      <LatestArticles />
    </div>
  );
};

export default Home;
