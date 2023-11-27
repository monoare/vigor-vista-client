import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: trainers } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      return res.data;
    },
  });
  console.log(trainers);

  return (
    <div>
      <p>all trainers</p>
    </div>
  );
};

export default AllTrainers;
