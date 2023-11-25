import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Trainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: profiles = [] } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Vigor Vista | Trainers</title>
      </Helmet>
      <Navbar />
      <p className="pt-28">Meet Our Trainers</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {profiles.map((profile) => (
          <div key={profile._id} className="bg-white p-4 rounded-md shadow-md">
            {/* Trainer name */}
            <h2 className="text-xl font-bold mb-2">
              Instructor: {profile.name}
            </h2>

            {/* Profile Image */}
            <img
              src={profile.image}
              alt={`Profile of ${profile.name}`}
              className="w-full h-32 object-cover mb-2 rounded-md"
            />

            {/* Years of Experience */}
            <p className="text-gray-700 mb-2">
              {profile.experience} Years of Experience
            </p>

            {/* Social icons */}
            <div className="flex mb-2 items-center">
              <span className="mr-2">Social Icons:</span>
              <FaFacebook className="mr-2 cursor-pointer" />
              <FaInstagram className="mr-2 cursor-pointer" />
              <FaXTwitter className="cursor-pointer" />
            </div>

            {/* Available time slots */}
            <div className="mb-2">
              <p>Available Time Slots:</p>
              <div className="flex flex-wrap">
                {Array.from({ length: profile.dayTime }, (_, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center mr-2 mb-2"
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Know more */}
            <Link to={`/trainerDetails/${profile._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Know more
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Link to="/beATrainer">
          <button>Be a trainer</button>
        </Link>
      </div>
    </div>
  );
};

export default Trainer;
