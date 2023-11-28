import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { trainerId } = useParams();
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold my-10">Payment</h1>
        <p className="text-xl font-semibold">Please pay to the trainers</p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm trainerId={trainerId} />
      </Elements>
    </div>
  );
};

export default Payment;
