import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { CgGym } from "react-icons/cg";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { BiTime } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

const RecommendedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // console.log(user.email);

  const { data: activityData = [] } = useQuery({
    queryKey: ["activityData", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paidMembers/${user?.email}`);
      return res.data;
    },
  });

  // console.log(activityData);

  const { data: recommendedClasses = [] } = useQuery({
    queryKey: ["recommendedClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });

  let recommended = [];
  for (let i = 0; i < activityData?.length; i++) {
    let filterName = activityData[i]?.trainerName;
    let filter = recommendedClasses?.filter((item) => item.name === filterName);
    recommended = recommended.concat(filter);
  }

  // console.log(recommendedClasses);
  // console.log(recommended);

  return (
    <div>
      <Helmet>
        <title>Vigor Vista | Recommendation</title>
      </Helmet>
      <h1 className="text-3xl text-center font-semibold my-10">
        Recommended Class For you
      </h1>
      <div className="ml-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommended?.map((profile) => (
          <div
            key={profile?._id}
            className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
          >
            {/* Trainer name */}
            <h2 className="text-xl font-bold mb-2 h-20">
              Instructor: {profile?.name}
            </h2>
            {/* Profile Image */}
            <img
              src={profile?.image}
              alt={`Profile of ${profile?.name}`}
              className="h-32 object-cover mb-2 rounded-md"
            />

            {/* Years of Experience */}
            <p className="text-gray-700 mb-2">
              {profile?.experience} Years of Experience
            </p>

            {/* skills */}
            <div className="mb-2 flex">
              <p className="pr-2">Skills:</p>
              <div className="flex flex-wrap">
                {profile?.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center mr-2 mb-2"
                  >
                    <CgGym className="mr-1" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Social icons */}
            <div className="flex mb-2 items-center">
              <span className="mr-2">Contact Me:</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedClasses;
