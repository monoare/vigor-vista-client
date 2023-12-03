import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = { name: data.name, email: data.email };
    axiosPublic
      .post("/subscribe", userInfo)
      .then((res) => {
        if (res.data.insertedId) {
          console.log("user added to the database");
          reset();
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "You have subscribed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // TODO: Shows user existing message
  };

  return (
    <div className="flex flex-col justify-center my-3 md:my-20">
      <header className="text-xl md:text-3xl font-bold text-center mb-5">
        Subscribe to Our Newsletter
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10">
        <div className="text-xs md:text-base text-justify px-3 md:px-0 md:pl-10">
          Stay in the loop with the latest updates, news, and exclusive content
          by subscribing to our newsletter. Enter your name and email address
          below, and click &apos;Subscribe&apos; to join our community. Be the
          first to receive exciting announcements, special offers, and valuable
          insights directly to your inbox. Don&apos;t miss out-subscribe now for
          a curated experience tailored just for you!
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-control text-xs md:text-base mx-3 md:w-80">
            <label className="label">
              <span className="label-text">Enter your name</span>
            </label>
            <div className="join">
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                placeholder="Your Name"
                className="input input-bordered text-xs md:text-base join-item w-full"
                required
              />
              {errors.name && (
                <span className="text-red-600 pt-2">Name is required</span>
              )}
            </div>

            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="username@site.com"
                className="input input-bordered join-item w-full text-xs md:text-base"
                required
              />
              {errors.email && (
                <span className="text-red-600 pt-2">Email is required</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary join-item mt-4">
              Subscribe
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
