import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: trainer } = useQuery({
    queryKey: ["Trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      const trainerData = res.data.find(
        (emailData) => emailData.email === user.email
      );
      return trainerData;
    },
  });

  const { data: paidMembers } = useQuery({
    queryKey: ["paidMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/paidMembers");
      const trainerData = res.data.filter(
        (paidMember) => paidMember.trainerId === trainer._id
      );
      return trainerData;
    },
  });

  // Generate time slots based on available time
  const timeSlots = Array.from(
    { length: trainer?.dayTime },
    (_, index) => index + 1
  );

  // Map each slot to a specific time of the day
  const timeRange = (slot) => {
    const baseTime = 8; // Assuming the day starts at 8:00 AM
    const startTime = baseTime + slot - 1;
    const endTime = startTime + 1;
    return `${startTime < 10 ? `0${startTime}` : startTime}:00-${
      endTime < 10 ? `0${endTime}` : endTime
    }:00`;
  };

  const handleTimeSlot = (slot) => {
    const paidMember = paidMembers.find(
      (member) => member.timeSlot == timeRange(slot)
    );

    return `${paidMember?.userName}`;
  };

  const isSlotAvailable = (slot) => {
    const showData = paidMembers.some(
      (member) => member.timeSlot == timeRange(slot)
    );

    return showData;
  };

  console.log(trainer);
  console.log("PaidMembers", paidMembers);

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-10">
        Manage My Slots
      </h1>
      <div className="w-2/3 mx-auto">
        <p className="text-xl font-medium mb-5 text-center">
          All the time slots of my day
        </p>
        <div className="flex flex-wrap justify-center">
          {timeSlots.map((slot) => (
            <div
              key={slot}
              className={`p-4 cursor-pointer border border-gray-400 flex flex-col items-center justify-center mr-4 mb-4 ${
                isSlotAvailable(slot)
                  ? "bg-green-200 text-green-800" // Available
                  : "bg-red-200 text-red-800" // Unavailable
              }`}
            >
              <p className="text-lg">{timeRange(slot)}</p>
              <p className="mt-2">
                {isSlotAvailable(slot) ? (
                  <span>Unavailable</span>
                ) : (
                  <span>Available</span>
                )}
              </p>
              {handleTimeSlot(slot) && (
                <p className="mt-2">{`Booked by: ${handleTimeSlot(slot)}`}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSlots;
