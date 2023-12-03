import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   console.log(user.email);
  const { data: allActivityData = [], refetch } = useQuery({
    queryKey: ["activityData", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paidMembers/${user?.email}`);
      return res.data;
    },
  });
  refetch();
  console.log(allActivityData);
  return (
    <div>
      <Helmet>
        <title>Vigor Vista | Activity Log</title>
      </Helmet>
      <h1 className="text-3xl text-center font-semibold my-10">
        Today&apos;s Activity
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allActivityData ? (
          <>
            {allActivityData?.map((activityData, index) => (
              <div key={index} className="container ml-5 mx-auto mt-8">
                <div className="rotate-2 shadow-lg rounded-md">
                  <div className="bg-white p-8 shadow-lg -rotate-2 rounded-md">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                      {/* Trainer Info */}
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">
                          Trainer Information
                        </h2>
                        <p>
                          Trainer:{" "}
                          <span className="text-blue-500">
                            {activityData.trainerName}
                          </span>
                        </p>
                      </div>

                      {/* Training Time Slot */}
                      <div className="flex-1 mt-4 md:mt-0">
                        <h2 className="text-xl font-semibold mb-2">
                          Training Time Slot
                        </h2>
                        <p>
                          Time Slot:{" "}
                          <span className="text-blue-500">
                            {activityData?.timeSlot}
                          </span>{" "}
                          hrs
                        </p>
                      </div>
                    </div>

                    {/* User Package Info */}
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-2">
                        User Package Information
                      </h2>
                      <p>
                        Package:{" "}
                        <span className="text-blue-500">
                          {activityData?.packageName}
                        </span>
                      </p>
                      <p>
                        Price:{" "}
                        <span className="text-blue-500">
                          $ {activityData?.packagePrice}
                        </span>
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-2">
                        User Information
                      </h2>
                      <p>
                        Name:{" "}
                        <span className="text-blue-500">
                          {activityData?.userName}
                        </span>
                      </p>
                      <p>
                        Email:{" "}
                        <span className="text-blue-500">
                          {activityData?.userEmail}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
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
    </div>
  );
};

export default ActivityLog;
