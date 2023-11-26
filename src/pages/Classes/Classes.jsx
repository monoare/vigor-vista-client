import { useState } from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Classes = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [activeTab, setActiveTab] = useState(daysOfWeek[1]); // Set Tuesday as the default active tab

  const handleTabClick = (day) => {
    setActiveTab(day);
  };

  // Filter classes based on the active tab
  const classesForActiveDay = classes.filter((cls) =>
    cls.schedule.some((day) => day.day === activeTab)
  );

  return (
    <div>
      <Helmet>
        <title>Vigor Vista | Classes</title>
      </Helmet>
      <Navbar />
      <div className="min-h-screen">
        <div className="pt-36 bg-red-500">
          <p className="text-5xl font-bold uppercase text-center">classes</p>
          <p className="text-2xl py-5 text-center">
            SPECIALIZED PROGRAMMING TO FIT YOUR GOALS.
          </p>
        </div>
        <div role="tablist" className="tabs tabs-lifted">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              role="tab"
              className={`tab text-2xl bg-green-100 ${
                activeTab === day ? "tab-active" : ""
              }`}
              style={{ backgroundColor: activeTab === day ? "#90EE90" : "" }}
              onClick={() => handleTabClick(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Display classes for the active day */}
        <div className="p-4 mb-10">
          <h2 className="text-2xl font-bold my-6 text-center">
            {activeTab} Classes
          </h2>
          {classesForActiveDay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {classesForActiveDay.map((cls) => (
                <div key={cls.id} className="card bg-base-100 shadow-xl">
                  <div className=" bg-green-300 w-full rounded-t-lg">
                    <h2 className="card-title flex justify-center py-4">
                      {cls.name}
                    </h2>
                  </div>

                  <div className="p-6">
                    <p className="py-1 text-justify">{cls.description}</p>
                    <p className="pb-1">
                      Trainer:{" "}
                      <span className="font-semibold">{cls.trainer}</span>
                    </p>
                    <p>
                      Duration:{" "}
                      <span className="font-semibold">{cls.duration}</span>
                    </p>
                    {/* Add more details as needed */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xl text-center">
              No classes available for {activeTab}.
            </p>
          )}
        </div>

        {/* Display all classes */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold my-6 pb-4 text-center border-b-2">
            All Classes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="card bg-base-100 shadow-xl relative flex flex-col"
              >
                <div className="bg-green-300 w-full rounded-t-lg">
                  <Link to={`/classDetails/${cls._id}`}>
                    <h2 className="card-title flex justify-center py-4 cursor-pointer">
                      {cls.name}
                    </h2>
                  </Link>
                </div>
                <div className="p-6 flex-grow">
                  <p className="py-1 text-justify">{cls.description}</p>
                  <p className="pb-1">
                    Trainer:{" "}
                    <span className="font-semibold">{cls.trainer}</span>
                  </p>
                  <p>
                    Duration:{" "}
                    <span className="font-semibold">{cls.duration}</span>
                  </p>
                  {/* Add more details as needed */}
                </div>
                <div className="card-actions">
                  <Link className="w-full" to="/trainer">
                    <button className="btn btn-primary w-full mt-auto">
                      Join Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Classes;
