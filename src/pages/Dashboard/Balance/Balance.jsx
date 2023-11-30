import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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

  const { data: subscribers } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribe");
      return res.data;
    },
  });

  const { data: paidMembers } = useQuery({
    queryKey: ["paidMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/paidMembers");
      return res.data;
    },
  });

  const totalPaidByMember = paidMembers
    ? paidMembers.reduce((total, amount) => total + amount.packagePrice, 0)
    : 0;

  console.log(paidMembers, totalPaidByMember);

  const totalSubscribers = subscribers ? subscribers?.length : 0;
  const totalPaidMembers = paidMembers ? paidMembers?.length : 0;

  const data = [
    {
      name: "Total Newsletter Subscribers",
      total: totalSubscribers,
    },
    { name: "Total Paid Members", total: totalPaidMembers },
  ];

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
            <div className="stat-value">
              ${TotalBalance + totalPaidByMember - totalPrice}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Payment</div>
            <div className="stat-value">${totalPrice}</div>
          </div>
        </div>
      </div>
      <p className="py-10 text-center text-2xl underline">
        Graphical Representation
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={500} height={400} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center ">
        <span className="text-black">Figure:</span>{" "}
        <span className="text-green-500">
          Total Newsletter Subscribers vs Total Paid Members
        </span>
      </p>
      <div>
        <p className="py-10 text-center text-2xl underline">
          Payment done by members
        </p>
        <div className="text-center space-y-3 py-5 border-double border-4 mx-10 border-green-500">
          {paidMembers &&
            paidMembers?.map((member, index) => (
              <div key={index}>
                <p>Member Name: {member?.userName}</p>
                <p>Paid Amount: ${member?.packagePrice}</p>
              </div>
            ))}
          <p className="text-xl font-medium">
            Total amount paid by members: ${totalPaidByMember}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
