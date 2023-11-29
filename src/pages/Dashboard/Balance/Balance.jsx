import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Balance = () => {
  const axiosSecure = useAxiosSecure();
  const TotalBalance = 894000;

  const { data: payments, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const totalPrice = payments
    ? payments.reduce((total, item) => total + item.price, 0)
    : 0;
  refetch();

  console.log(payments);
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-10">Statistics</h1>
      <div className="flex justify-center">
        <div className="stats bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title">Current balance</div>
            <div className="stat-value">${TotalBalance - totalPrice}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Payment</div>
            <div className="stat-value">${totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
