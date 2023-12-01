import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageMember = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: trainer, refetch } = useQuery({
    queryKey: ["Trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      const trainerData = res.data.find(
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
      const trainerData = res.data.filter(
        (paidMember) => paidMember.trainerId === trainer?._id
      );
      return trainerData;
    },
  });
  console.log(paidMembers);
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-10">
        All the members
      </h1>
      <div className="overflow-x-auto ml-5 w-full ">
        <table className="table w-auto mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Package Name</th>
              <th>Package Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {paidMembers?.map((paidMember, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{paidMember?.userName}</td>
                <td>{paidMember?.userEmail}</td>
                <td>{paidMember?.packageName}</td>
                <td>{paidMember?.packagePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMember;
