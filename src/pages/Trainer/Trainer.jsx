import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbHandClick } from "react-icons/tb";
import { BiTime } from "react-icons/bi";
import Footer from "../shared/Footer";

const Trainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: profiles = [], refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });
  refetch();
  // Function to format time in HH:mm format
  const formatTime = (hour) => {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
  };
  refetch();
  if (!profiles) {
    return (
      <div className="w-5vw flex justify-center items-center mt-40">
        <span className="loading loading-ring w-[200px]"></span>
      </div>
    );
  }

  // console.log("Profiles:", profiles);
  refetch();

  return (
    <div>
      <Helmet>
        <title>Vigor Vista | Trainers</title>
      </Helmet>
      <Navbar />
      <div className="bg-slate-100 pt-28">
        <p className="text-center text-3xl font-semibold">Meet Our Trainers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {profiles ? (
            <>
              {profiles?.map((profile) => (
                <div
                  key={profile?._id}
                  className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
                >
                  {/* Trainer name */}
                  <h2 className="text-xl font-bold mb-2">
                    Instructor: {profile?.name}
                  </h2>
                  {/* Profile Image */}
                  <img
                    src={profile?.image}
                    alt={`Profile of ${profile?.name}`}
                    className="w-full h-32 object-cover mb-2 rounded-md"
                  />

                  {/* Years of Experience */}
                  <p className="text-gray-700 mb-2">
                    {profile?.experience} Years of Experience
                  </p>

                  {/* Social icons */}
                  <div className="flex mb-2 items-center">
                    <span className="mr-2">Social Icons:</span>
                    <FaFacebook className="mr-2 cursor-pointer" />
                    <FaInstagram className="mr-2 cursor-pointer" />
                    <FaXTwitter className="cursor-pointer" />
                  </div>

                  {/* Available weekly slots */}
                  <div className="mb-2">
                    <p>Available Weekly Slots:</p>
                    <div className="flex flex-wrap">
                      {profile?.weekTime?.map((day) => (
                        <div
                          key={day}
                          className="flex items-center justify-center mr-2 mb-2"
                        >
                          <BiTime className="mr-1" />
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available time slots */}
                  <div className="mb-2">
                    <p className="mb-1">Available Time Slots:</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: profile.dayTime }, (_, index) => (
                        <Link
                          to={{
                            pathname: `/userBooking/${profile._id}`,
                            search: `?timeSlot=${formatTime(
                              index + 8
                            )}-${formatTime(index + 9)}`,
                          }}
                          key={index}
                        >
                          <div className="h-8 px-2 py-2 border border-gray-400 rounded-full flex items-center justify-center mr-2 mb-2 text-[12px]">
                            <BiTime className="mr-1" />
                            {`${formatTime(index + 8)}-${formatTime(
                              index + 9
                            )} hr`}
                          </div>
                        </Link>
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
            </>
          ) : (
            <>
              <div className="w-5vw flex justify-center items-center mt-40">
                <span className="loading loading-ring w-[200px]"></span>
              </div>
            </>
          )}
        </div>
        <div className=" py-20 flex flex-col justify-center items-center">
          <Link to="/beATrainer">
            <button className="btn btn-primary text-2xl">Be a trainer</button>
          </Link>
          <TbHandClick className="text-center text-4xl animate-bounce" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Trainer;
