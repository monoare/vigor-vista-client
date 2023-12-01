import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddNewForum = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    // image upload to the imgbb website and then get the url
    const imageFile = { image: data.image[0] };
    console.log(imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.success) {
      // send the profile data to the server
      const forumDetails = {
        author: user.displayName,
        authorImg: user.photoURL,
        publishDate: new Date(),

        category: data.category,
        title: data.title,

        shortDescription: data.shortDescription,
        description: [data.description],
        image: res.data.data.display_url,
        upVote: 0,
        downVote: 0,
      };
      console.log(forumDetails);

      const forumRes = await axiosSecure.post("/forums", forumDetails);
      console.log(forumRes.data);
      if (forumRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName}'s forum is added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div>
      <Helmet>
        <title>Vigor Vista | Forum</title>
      </Helmet>
      <h1 className="text-3xl text-center font-semibold my-10">
        Add New Forum
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg p-8 mx-auto shadow-lg bg-base-200 rounded-lg"
      >
        {/* Forum Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Forum Category
          </label>
          <input
            type="text"
            placeholder="Forum  Category"
            {...register("category", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.category && (
            <span className="text-red-600 pt-2">
              Forum category is required
            </span>
          )}
        </div>

        {/* Forum Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Forum Title
          </label>
          <textarea
            type="text"
            placeholder="Forum Title"
            {...register("title", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.category && (
            <span className="text-red-600 pt-2">Forum title is required</span>
          )}
        </div>

        {/* shortDescription of forum */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Forum Short Description
          </label>
          <textarea
            type="text"
            placeholder="Enter Your Forum Short Description"
            {...register("shortDescription", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
          {errors.experience && (
            <span className="text-red-600 pt-2">
              Forum short description is required
            </span>
          )}
        </div>

        {/* Description of forum */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Forum Description
          </label>
          <textarea
            type="text"
            placeholder="Enter Your Forum Short Description"
            {...register("description", { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows={5}
            required
          />
          {errors.experience && (
            <span className="text-red-600 pt-2">
              Forum description is required
            </span>
          )}
        </div>

        {/* Profile Image */}
        <label className="block text-sm font-medium text-gray-700 pb-[2px]">
          Forum Related Image
        </label>
        <div className="form-control border rounded-lg w-full mb-6">
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full"
          />
          {errors.image && (
            <span className="text-red-600 pt-2">
              Forum related image is required
            </span>
          )}
        </div>

        {/* Apply Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 w-1/2 text-white px-4 py-2 rounded-md"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewForum;
