import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: trainers, refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      return res.data;
    },
  });
  refetch();
  const calculateMonthsSinceJoining = (joiningDate) => {
    const today = new Date();
    const joinDate = new Date(joiningDate);

    const months =
      (today.getFullYear() - joinDate.getFullYear()) * 12 +
      today.getMonth() -
      joinDate.getMonth();
    return months;
  };
  refetch();

  // console.log(trainers);
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold my-10">All Trainers</h2>
      <div className="mx-auto">
        <div className="overflow-x-auto ml-2">
          <table className="table mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joining Date</th>
                <th>Months Since Joining</th>
                <th>Paid Amount</th>
                <th>Payment Status</th>
                <th>Make Payment</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {Array.isArray(trainers) &&
                trainers.map((trainer, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{trainer?.name}</td>
                    <td>{trainer?.email}</td>
                    <td>{trainer?.joiningDate}</td>

                    <td>
                      <p className="text-center">
                        {calculateMonthsSinceJoining(trainer?.joiningDate)}
                      </p>
                    </td>
                    <td>
                      {trainer?.payment?.price
                        ? trainer?.payment?.price
                        : "Null"}
                    </td>
                    <td>
                      {trainer?.payment?.status
                        ? trainer?.payment?.status
                        : "Pending"}
                    </td>
                    <td className="text-center">
                      <Link to={`/dashboard/payment/${trainer._id}`}>
                        <div>
                          <button className="btn btn-secondary btn-sm">
                            Pay
                          </button>
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTrainers;
