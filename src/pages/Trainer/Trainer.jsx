import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Trainer = () => {
  // const axiosSecure = useAxiosSecure();
  // const { data: profile = [] } = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/trainers");
  //     return res.data;
  //   },
  // });

  // console.log(profile);

  return (
    <div>
      <Navbar />
      <p className="pt-28">This is trainer page</p>
      <div>
        <Link to="/beATrainer">
          <button>Be a trainer</button>
        </Link>
      </div>
    </div>
  );
};

export default Trainer;
