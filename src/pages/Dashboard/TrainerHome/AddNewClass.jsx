import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddNewClass = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const schedule = [];

    // Schedule One
    const scheduleOne = {
      day: data.selectedDay,
      time: data.startTime,
    };
    schedule.push(scheduleOne);

    // Schedule Two
    const scheduleTwo = {
      day: data.selectedDayTwo,
      time: data.startTimeTwo,
    };
    schedule.push(scheduleTwo);

    // console.log(schedule);

    const classDetails = {
      name: data.className,
      description: data.description,
      trainer: user.displayName,
      duration: data.duration,
      schedule: schedule,
      location: data.location,
    };
    // console.log(classDetails);
    const classRes = await axiosSecure.post("/classes", classDetails);
    console.log(classRes.data);
    if (classRes.data.insertedId) {
      // show success popup
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.displayName}'s class is added successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Vigor Vista | Class Form</title>
      </Helmet>
      <h1 className="text-3xl text-center font-semibold my-10">
        Add new class
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg p-8 mx-auto shadow-lg bg-base-200 rounded-lg"
      >
        {/* Class name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Class Name
          </label>
          <input
            type="text"
            placeholder="Enter class name"
            {...register("className", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.category && (
            <span className="text-red-600 pt-2">Class name is required</span>
          )}
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Class Duration
          </label>
          <div className="flex gap-4 items-center">
            <div>
              <input
                type="radio"
                value="1 hour"
                {...register("duration", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">1 hour</label>
            </div>
            <div>
              <input
                type="radio"
                value="2 hours"
                {...register("duration", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">2 hours</label>
            </div>
          </div>
          {errors.duration && (
            <span className="text-red-600 pt-2">
              Class duration is required
            </span>
          )}
        </div>

        {/* Schedule-1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Schedule One
          </label>
          <select
            {...register("selectedDay", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          {errors.selectedDay && (
            <span className="text-red-600 pt-2">Please select a day</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Class Start Time
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-between items-center">
            <div className="flex items-center">
              <input
                type="radio"
                value="08:00 AM"
                {...register("startTime", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">08:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="09:00 AM"
                {...register("startTime", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">09:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="10:00 AM"
                {...register("startTime", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">10:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="11:00 AM"
                {...register("startTime", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">11:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="12:00 PM"
                {...register("startTime", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">12:00 PM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="05:00 PM"
                {...register("startTime", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">05:00 PM</label>
            </div>
          </div>
          {errors.startTime && (
            <span className="text-red-600 pt-2">
              Class start time is required
            </span>
          )}
        </div>

        {/* Schedule-2 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Schedule Two
          </label>
          <select
            {...register("selectedDayTwo", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          {errors.selectedDayTwo && (
            <span className="text-red-600 pt-2">Please select a day</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Class Start Time
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-between items-center">
            <div className="flex items-center">
              <input
                type="radio"
                value="08:00 AM"
                {...register("startTimeTwo", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">08:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="09:00 AM"
                {...register("startTimeTwo", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">09:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="10:00 AM"
                {...register("startTimeTwo", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">10:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="11:00 AM"
                {...register("startTimeTwo", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">11:00 AM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="12:00 PM"
                {...register("startTimeTwo", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">12:00 PM</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="05:00 PM"
                {...register("startTimeTwo", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
              <label className="ml-2">05:00 PM</label>
            </div>
          </div>
          {errors.startTimeTwo && (
            <span className="text-red-600 pt-2">
              Class start time is required
            </span>
          )}
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            type="text"
            placeholder="Enter Your Class Short Description"
            {...register("description", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
          {errors.description && (
            <span className="text-red-600 pt-2">
              Forum short description is required
            </span>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter class location"
            {...register("location", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.location && (
            <span className="text-red-600 pt-2">
              Class location is required
            </span>
          )}
        </div>

        {/* Apply Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 w-1/2 text-white px-4 py-2 rounded-md"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewClass;
