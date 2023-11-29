import { useForm } from "react-hook-form";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const BeATrainer = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const skills = [
    "Weight Loss",
    "Body Sculpting",
    "Strength Training",
    "CrossFit",
    "Endurance Running",
    "Fitness & Nutrition",
  ];

  const onSubmit = async (data) => {
    // console.log(data);

    // image upload to the imgbb website and then get the url
    const imageFile = { image: data.image[0] };
    console.log(imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.success) {
      // Now 'selectedSkills' is an array containing the names of selected skills.
      const selectedSkills = Object.keys(data.skills).filter(
        (skill) => data.skills[skill]
      );
      // console.log("Selected Skills:", selectedSkills);

      // Now 'selectedWeekdays' is an array containing the names of selected weekdays.
      const selectedWeekdays = Object.keys(data.weekdays).filter(
        (day) => data.weekdays[day]
      );
      // console.log("Selected Weekdays:", selectedWeekdays);

      // send the profile data to the server
      const trainerProfile = {
        name: data.name,
        email: user.email,
        age: parseInt(data.age),
        experience: parseInt(data.experience),
        skills: selectedSkills,
        weekTime: selectedWeekdays,
        dayTime: data.dayTime,
        description: data.description,
        image: res.data.data.display_url,
      };
      // console.log(trainerProfile);

      const trainerRes = await axiosSecure.post("/beTrainer", trainerProfile);
      console.log(trainerRes.data);
      if (trainerRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} profile is added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    // console.log("with image url", res.data);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto pt-28 pb-10 bg-base-200">
        <h1 className="text-center text-4xl font-bold py-5">
          Trainer Application Form
        </h1>
        <p className="pb-5 max-w-xl mx-auto">
          Apply to Become a Trainer - Fill out the form below with your details
          and skills to join our team of dedicated trainers. We look forward to
          welcoming you on board!
        </p>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md p-8 mx-auto shadow-lg bg-base-100 rounded-lg"
          >
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
              {errors.name && (
                <span className="text-red-600 pt-2">Name is required</span>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100"
              />
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                {...register("age", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
              {errors.age && (
                <span className="text-red-600 pt-2">Age is required</span>
              )}
            </div>

            {/* Years of Experience */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                placeholder="Enter Your Years of Experience"
                {...register("experience", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
              {errors.experience && (
                <span className="text-red-600 pt-2">
                  Years of experience is required
                </span>
              )}
            </div>

            {/* Profile Image */}
            <label className="block text-sm font-medium text-gray-700 pb-[2px]">
              Profile Image
            </label>
            <div className="form-control border rounded-lg w-full mb-6">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full"
              />
              {errors.image && (
                <span className="text-red-600 pt-2">
                  Profile image is required
                </span>
              )}
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <label key={skill} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      {...register(`skills.${skill}`)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Available Time per Week */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Weekdays
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <label key={day} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      {...register(`weekdays.${day}`)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Available Time per Day */}
            <div className="mb-4">
              <label
                htmlFor="availableTimePerDay"
                className="block text-sm font-medium text-gray-700"
              >
                Available Time per Day
              </label>
              <input
                type="number"
                placeholder="Available Time Per Day"
                {...register("dayTime", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
              {errors.dayTime && (
                <span className="text-red-600 pt-2">
                  Available time per day is required
                </span>
              )}
            </div>

            {/* Other Info */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <textarea
                type="text"
                placeholder="Description"
                {...register("description", { required: true })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.description && (
                <span className="text-red-600 pt-2">
                  Description is required
                </span>
              )}
            </div>

            {/* Apply Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BeATrainer;
