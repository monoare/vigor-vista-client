import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const UserBooking = () => {
  const { id: trainerId } = useParams();
  const location = useLocation();
  const timeSlot = new URLSearchParams(location.search).get("timeSlot");

  console.log("Trainer ID:", trainerId);

  console.log("Selected Time Slot Index:", timeSlot);
  const plans = [
    {
      id: 1,
      name: "Silver",
      classes: 10,
      facilities: ["Gym Access", "Basic Training"],
      price: 500,
      color: "bg-[#C0C0C0]",
      textColor: "text-black",
    },
    {
      id: 2,
      name: "Gold",
      classes: 20,
      facilities: ["Gym Access", "Advanced Training", "Nutrition Consultation"],
      price: 750,
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
      price: 1000,
      color: "bg-[#E6E6E6]",
      textColor: "text-black",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-28 min-h-[100vh]">
        <h2 className="text-3xl font-bold my-8 text-center">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {plans?.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-lg shadow-lg ${plan.color} ${plan.textColor}`}
            >
              <div className="h-44">
                <h3 className="text-xl font-bold mb-2 bg-">{plan.name}</h3>
                <p className="border border-black"></p>
                <p className="my-4">
                  <strong>Classes:</strong> {plan.classes}
                </p>
                <p className="mb-4">
                  <strong>Facilities:</strong> {plan.facilities.join(", ")}
                </p>
                <p className="mb-4">
                  <strong>Price:</strong> ${plan.price}
                </p>
              </div>
              <Link
                to={{
                  pathname: `/userPayment/${plan.id}`,
                  search: `?timeSlot=${timeSlot}&trainerId=${trainerId}`,
                }}
              >
                <button className="text-white px-6 py-2 mt-2 btn btn-info">
                  Join Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserBooking;
