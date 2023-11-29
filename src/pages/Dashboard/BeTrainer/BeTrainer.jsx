import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa6";
// import { Link } from "react-router-dom";

const BeTrainer = () => {
  const axiosSecure = useAxiosSecure();

  const { data: beTrainers, refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/beTrainer");
      return res.data;
    },
  });

  const handleConfirm = async (trainerId, user) => {
    const updatedDoc = {
      age: user?.age,
      dayTime: user?.dayTime,
      description: user?.description,
      email: user?.email,
      experience: user?.experience,
      image: user?.image,
      joiningDate: user?.joiningDate,
      name: user?.name,
      skills: user?.skills,
      weekTime: user?.weekTime,
      status: "Trainer",
    };
    const res = await axiosSecure.put(`/beTrainer/${trainerId}`, updatedDoc);
    console.log("Server response:", res.data);
    refetch();
  };
  refetch();

  // console.log(beTrainers);

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-10">Be a Trainer</h1>
      <div className="mx-auto">
        <div className="overflow-x-auto ml-2">
          <table className="table mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {Array.isArray(beTrainers) &&
                beTrainers.map((trainer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={trainer?.image} alt={trainer?.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{trainer?.name}</td>
                    <td>{trainer?.email}</td>
                    <td>
                      {trainer?.updatedDoc?.status
                        ? trainer?.updatedDoc?.status
                        : "Normal User"}
                    </td>

                    <td className="text-center">
                      <div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        >
                          <FaEye></FaEye>
                        </button>
                        <dialog id="my_modal_5" className="modal modal-middle">
                          <div className="modal-box">
                            <div className="flex justify-center">
                              <img
                                className="w-40"
                                src={trainer?.image}
                                alt=""
                              />
                            </div>
                            <div className="w-1/2 mx-auto">
                              <h3 className="font-bold text-lg">
                                Name: {trainer?.name}
                              </h3>
                              <p>Email: {trainer?.email} </p>
                              <p className="py-2">
                                Experience: {trainer?.experience}
                              </p>
                              <p>
                                Skills:
                                {trainer?.skills.map((skill, index) => (
                                  <span className="pl-1" key={index}>
                                    {skill},
                                  </span>
                                ))}
                              </p>
                              <p className="py-2">
                                Available Time:{" "}
                                {trainer?.weekTime.map((day, index) => (
                                  <span className="pl-1" key={index}>
                                    {day},
                                  </span>
                                ))}
                              </p>

                              <p className="pb-4">
                                Description: {trainer?.description}
                              </p>
                            </div>
                            <div className="flex justify-center gap-3 mb-2">
                              <button
                                onClick={() =>
                                  handleConfirm(trainer._id, trainer)
                                }
                                className="btn btn-primary"
                              >
                                Confirmation
                              </button>
                              <button className="btn btn-primary">
                                Reject
                              </button>
                            </div>
                            <div className="modal-middle">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BeTrainer;
