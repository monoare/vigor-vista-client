import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import gym from "../../assets/image/gym.webp";

const ClassDetails = () => {
  const { classId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch details for the specific class using React Query
  const { data: classDetails } = useQuery({
    queryKey: ["classDetails", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${classId}`);
      return res.data;
    },
  });

  if (!classDetails) {
    // You may want to add loading state or error handling here
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="pt-28">
          <h1 className="text-4xl font-bold text-center my-10">
            Class Details
          </h1>
          <div className="flex flex-col md:flex-row">
            <div className="w-1/2  image-full rounded-none">
              <img src={gym} alt="Shoes" />
            </div>

            <div className="w-1/2 mx-auto p-8 bg-white rounded-none">
              <p>
                Explore the details of the selected fitness class, including its
                description, schedule, trainer, duration, and location. Immerse
                yourself in the information provided to make the most out of
                your fitness experience.
              </p>
              <p className="border-y-2 p-1 my-5"></p>
              <div>
                <h2 className="text-3xl font-bold mb-4">{classDetails.name}</h2>
                <p className="text-gray-600 mb-4">{classDetails.description}</p>
                <p className="py-4">
                  <strong>Trainer:</strong> {classDetails.trainer}
                </p>
                <p>
                  <strong>Duration:</strong> {classDetails.duration}
                </p>
                <p className="py-4">
                  <strong>Schedule:</strong>
                  <ul>
                    {classDetails.schedule.map((dayTime, index) => (
                      <li key={index}>
                        {dayTime.day} at {dayTime.time}
                      </li>
                    ))}
                  </ul>
                </p>
                <p>
                  <strong>Location:</strong> {classDetails.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClassDetails;
