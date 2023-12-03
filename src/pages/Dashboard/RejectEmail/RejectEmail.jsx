import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ContactUs } from "../../shared/ContactUs";

const RejectEmail = () => {
  const { id } = useParams();
  //   console.log(id);

  const axiosSecure = useAxiosSecure();

  const { data: beTrainers } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/beTrainer/reject/${id}`);
      return res.data;
    },
  });

  //   console.log(beTrainers);
  return (
    <div>
      <p className="text-3xl text-center font-semibold my-10">
        Rejection email
      </p>
      <ContactUs email={beTrainers?.email} name={beTrainers?.name} />
    </div>
  );
};

export default RejectEmail;
