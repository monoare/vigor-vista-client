import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ trainerId }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // console.log(trainerId);

  const { data: trainers, refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainers/${trainerId}`);
      return res.data;
    },
  });

  const today = new Date();
  const joinDate = new Date(trainers?.joiningDate);
  const months =
    (today.getFullYear() - joinDate.getFullYear()) * 12 +
    today.getMonth() -
    joinDate.getMonth();

  const totalPrice = months * 1000;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

    if (confirmError) {
      console.log("Error confirming payment:", confirmError);
    }

    if (paymentIntent.status === "succeeded") {
      console.log("Done");

      const payment = {
        status: "paid",
        price: totalPrice,
      };

      const adminInfo = {
        email: trainers?.email,
        name: trainers?.name,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: "Payment Completed",
      };
      const adminRes = await axiosSecure.post("/payments", adminInfo);
      console.log("2nd Done");
      const res = await axiosSecure.put(`/trainers/${trainerId}`, payment);
      console.log("3rd Done");
      console.log("payment saved", adminRes.data, res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thank you for the payment",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/allTrainers");
      refetch();
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: confirmError,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="mt-20 lg:w-2/3 mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "24px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div className="mt-5 text-center">
          <button
            className="btn btn-secondary w-full lg:w-1/2"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
      </form>

      <div className="mt-10">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    </div>
  );
};

export default CheckoutForm;
