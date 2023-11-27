import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllSubscriber = () => {
  const axiosPublic = useAxiosPublic();

  const { data: subscribers } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/subscribe");
      return res.data;
    },
  });
  console.log(subscribers);
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold my-10">
        All Newsletter Subscribers
      </h2>
      <div className="w-1/2 mx-auto">
        <div className="overflow-x-auto">
          <table className="table mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {subscribers?.map((subscriber, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{subscriber?.name}</td>
                  <td>{subscriber.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSubscriber;
