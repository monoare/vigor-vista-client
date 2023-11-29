import { useLocation, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const UserPayment = () => {
  const { id } = useParams();
  const location = useLocation();
  const timeSlot = new URLSearchParams(location.search).get("timeSlot");
  const trainerId = new URLSearchParams(location.search).get("trainerId");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: profiles = [] } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      const trainer = res.data.find((profile) => profile._id === trainerId);
      return trainer;
    },
  });

  console.log(profiles);

  console.log(id, timeSlot, trainerId);

  const plans = [
    {
      id: 1,
      name: "Silver",
      classes: 10,
      facilities: ["Gym Access", "Basic Training"],
      price: 50,
      color: "bg-[#C0C0C0]",
      textColor: "text-black",
    },
    {
      id: 2,
      name: "Gold",
      classes: 20,
      facilities: ["Gym Access", "Advanced Training", "Nutrition Consultation"],
      price: 75,
      color: "bg-[#FFD700]",
      textColor: "text-white",
    },
    {
      id: 3,
      name: "Diamond",
      classes: 30,
      facilities: [
        "Gym Access",
        "Personal Trainer",
        "Nutrition Consultation",
        "Spa Access",
      ],
      price: 100,
      color: "bg-[#E6E6E6]",
      textColor: "text-black",
    },
  ];

  const filterPlan = plans.find((plan) => plan.id === parseInt(id));
  console.log(filterPlan);

  const handleConfirm = async () => {
    console.log("Clicked");
    //

    const paidMember = {
      trainerId: trainerId,
      trainerName: profiles?.name,
      timeSlot: timeSlot,
      packageName: filterPlan?.name,
      packagePrice: filterPlan?.price,
      userName: user?.displayName,
      userEmail: user?.email,
    };
    const res = await axiosSecure.post("/paidMembers", paidMember);
    if (res.data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thanks! You are a paid member",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Vigor Vista | Payment</title>
      </Helmet>
      <div className="pt-28 min-h-[100vh]">
        <h1 className="text-3xl font-bold my-8 text-center capitalize">
          Pay and become our member
        </h1>
        <div className="space-y-4 border-double border-4 mx-4 py-10 border-green-600 rounded-xl">
          <p className="text-center text-xl font-semibold">
            Trainer Name: {profiles?.name}
          </p>
          <p className="text-center text-xl font-semibold">
            Slot that you want to book: {timeSlot} hr
          </p>
          <p className="text-center text-xl font-semibold">
            Package name: {filterPlan?.name}
          </p>
          <p className="text-center text-xl font-semibold">
            Package Price: ${filterPlan?.price}
          </p>
          <p className="text-center text-xl font-semibold">
            Who you are: {user?.displayName}
          </p>
          <p className="text-center text-xl font-semibold">
            Your email: {user?.email}
          </p>
          <div className="text-center">
            <button onClick={handleConfirm} className="btn btn-primary">
              Confirm
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPayment;
