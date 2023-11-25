import { useParams } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TrainerDetails = () => {
  const { trainerId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch details for the specific trainer using React Query
  const { data: trainerDetails = {} } = useQuery({
    queryKey: ["trainerDetails", trainerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${trainerId}`);
      return res.data;
    },
  });

  // Generate time slots based on available time
  const timeSlots = Array.from(
    { length: trainerDetails.dayTime },
    (_, index) => index + 1
  );

  // Map each slot to a specific time of the day
  const timeRange = (slot) => {
    const baseTime = 8; // Assuming the day starts at 8:00 AM
    const startTime = baseTime + slot - 1;
    const endTime = startTime + 1;
    return `${startTime < 10 ? `0${startTime}` : startTime}:00 - ${
      endTime < 10 ? `0${endTime}` : endTime
    }:00 hr`;
  };

  return (
    <div>
      <Navbar />
      <div className="pt-28 min-h-[calc(100vh-100px)]">
        <div className="p-4 flex flex-col md:flex-row gap-10">
          {/* Profile Image */}
          <div>
            <img
              src={trainerDetails.image}
              alt={`Profile of ${trainerDetails.name}`}
              className="w-full object-cover mb-4 rounded-md shadow-md"
            />
          </div>

          <div className="md:w-2/3">
            {/* Trainer name */}
            <h2 className="text-4xl font-bold mb-4 text-blue-600">
              {trainerDetails.name}
            </h2>

            {/* Years of Experience */}
            <p className="text-gray-700 mb-4">
              {trainerDetails.experience} Years of Experience
            </p>

            {/* Available time slots with time of day */}
            <div className="mb-4">
              <p className="mb-2 text-lg font-semibold">
                Available Time Slots:
              </p>
              <div className="flex flex-wrap">
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className="w-32 h-16 border border-gray-400 rounded-full flex items-center justify-center mr-2 mb-2 bg-blue-200 text-blue-800"
                  >
                    {timeRange(slot)}
                  </div>
                ))}
              </div>
            </div>

            {/* Other details about the trainer */}
            <div className="mb-4">
              <p className="text-gray-800">{trainerDetails.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrainerDetails;
