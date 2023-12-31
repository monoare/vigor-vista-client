import class1Image from "../../../assets/image/class1.jpg";
import class2Image from "../../../assets/image/class2.jpg";
import class3Image from "../../../assets/image/class3.jpg";
import class4Image from "../../../assets/image/class4.jpg";
import class5Image from "../../../assets/image/class5.jpg";
import class6Image from "../../../assets/image/class6.jpg";

const FeaturedClasses = () => {
  const classes = [
    {
      name: "HIIT Blast",
      description:
        "High-Intensity Interval Training for maximum calorie burn and cardiovascular fitness.",
      image: class1Image,
    },
    {
      name: "Yoga Flow",
      description:
        "Find balance and flexibility with our rejuvenating Yoga Flow classes suitable for all levels.",
      image: class2Image,
    },
    {
      name: "Strength & Conditioning",
      description:
        "Build muscle, increase strength, and boost metabolism in our dynamic Strength & Conditioning sessions.",
      image: class3Image,
    },
    {
      name: "Spin & Burn",
      description:
        "Experience the thrill of cycling and torch calories in our energetic Spin & Burn classes.",
      image: class4Image,
    },
    {
      name: "Mindful Meditation",
      description:
        "Relax your mind and reduce stress with our guided Mindful Meditation sessions.",
      image: class5Image,
    },
    {
      name: "Boxing Bootcamp",
      description:
        "Unleash your inner fighter while getting a full-body workout in our high-energy Boxing Bootcamp.",
      image: class6Image,
    },
  ];

  return (
    <section className="bg-neutral-light pb-20 pt-5">
      <div className="container mx-auto text-center">
        <h2 className="text-xl md:text-4xl font-bold mb-8">Featured Classes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes?.map((cls, index) => (
            <div key={index} className="card  bg-base-100 shadow-xl">
              <figure className="px-10 md:pt-10">
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="rounded-xl h-60"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-sm md:text-lg">{cls.name}</h2>
                <p className="text-gray-700 text-xs md:text-base">
                  {cls.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
