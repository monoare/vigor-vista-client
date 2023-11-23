import AboutSection from "../About/About";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-350px)]">
      <Banner />
      <Featured />
      <AboutSection />
    </div>
  );
};

export default Home;
