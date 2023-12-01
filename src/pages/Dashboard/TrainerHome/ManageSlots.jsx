import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: trainer, refetch } = useQuery({
    queryKey: ["Trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      const trainerData = res.data?.find(
        (emailData) => emailData.email === user.email
      );
      return trainerData;
    },
  });

  refetch();
  const { data: paidMembers } = useQuery({
    queryKey: ["paidMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/paidMembers");
      const trainerData = res.data?.filter(
        (paidMember) => paidMember.trainerId === trainer?._id
      );
      return trainerData;
    },
  });

  // Generate time slots based on available time
  const timeSlots = Array.from(
    { length: trainer?.dayTime },
    (_, index) => index + 1
  );
  refetch();
  // Map each slot to a specific time of the day
  const timeRange = (slot) => {
    const baseTime = 8; // Assuming the day starts at 8:00 AM
    const startTime = baseTime + slot - 1;
    const endTime = startTime + 1;
    return `${startTime < 10 ? `0${startTime}` : startTime}:00-${
      endTime < 10 ? `0${endTime}` : endTime
    }:00`;
  };

  refetch();
  const handleTimeSlot = (slot) => {
    const paidMember = paidMembers?.find(
      (member) => member.timeSlot == timeRange(slot)
    );

    return paidMember;
  };
  refetch();
  const isSlotAvailable = (slot) => {
    return paidMembers?.some((member) => member.timeSlot == timeRange(slot));
  };

  refetch();
  // console.log("trainer", trainer);
  // console.log("PaidMembers", paidMembers);

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
          {timeSlots?.map((slot) => {
            const slotAvailable = isSlotAvailable(slot);
            const bookedBy = handleTimeSlot(slot);
            console.log(bookedBy?.userEmail);

            return (
              <div
                key={slot}
                className={`p-4 border border-gray-400 flex flex-col items-center justify-center mr-4 mb-4 ${
                  slotAvailable
                    ? "bg-green-200 text-green-800" // Available
                    : "bg-red-200 text-red-800" // Unavailable
                }`}
              >
                <p className="text-lg">{timeRange(slot)}</p>
                <p className="mt-2">
                  {slotAvailable ? (
                    <span>Unavailable</span>
                  ) : (
                    <span>Available</span>
                  )}
                </p>
                {bookedBy ? (
                  <>
                    <p className="mt-2">{`Booked by: ${bookedBy?.userName}`}</p>
                    <Link
                      to={`/dashboard/sendEmail/${bookedBy?.userEmail}/${bookedBy?.userName}`}
                    >
                      <button className="btn mt-5">Reject</button>
                    </Link>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageSlots;
