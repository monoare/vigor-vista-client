import cardio from "../../../assets/image/cardio.jpg";
import sculpt from "../../../assets/image/sculpt.jpg";
import mind from "../../../assets/image/mind.jpg";
import functional from "../../../assets/image/Functional Fitness.jpg";

const Featured = () => {
  return (
    <div className="mb-20 mt-10">
      <h1 className="text-4xl my-5 text-center">
        Explore Our Comprehensive Fitness Ecosystem
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={cardio} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Cardio</h2>
            <p>
              Get fitter and burn calories. These classes are for anyone that
              loves music and energy.
            </p>
          </div>
        </div>

        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={sculpt} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Sculpt & Tone</h2>
            <p>
              Change the shape of your body by strengthening and conditioning
              your muscles.
            </p>
          </div>
        </div>

        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={mind} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Mind & Body</h2>
            <p>
              All rounder classes for wellbeing, core strength, flexibility and
              low impact conditioning.
            </p>
          </div>
        </div>
        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={functional} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Functional</h2>
            <p>
              Feel stronger and fitter using functional kit such as battle
              ropes, assault bikes and kettlebells.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
