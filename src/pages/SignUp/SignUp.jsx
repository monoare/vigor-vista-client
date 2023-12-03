import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import signUpImg from "../../assets/image/signup.avif";
import useAuth from "../../Hooks/useAuth";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      // console.log("logged user", loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // created user will be send to the database
          const userInfo = {
            name: data?.name,
            email: data?.email,
            photoURL: data?.photoURL,
            status: "Member",
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            // console.log(userInfo);
            if (res.data.insertedId) {
              // console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-right",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  return (
    <>
      <Helmet>
        <title>Vigor Vista | Sign Up</title>
      </Helmet>

      <div
        className="hero min-h-screen bg-base-200"
        style={{
          backgroundImage: `url(${signUpImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className=" text-xl pt-16 md:pt-0 ms:text-5xl font-bold">
              Sign Up now!
            </h1>
            <p className="py-6 text-black font-semibold text-xs md:text-xl">
              Embark on a journey of discovery and growth with us. Sign up today
              to unlock a world of opportunities, where your aspirations and
              ambitions find a home. Join our community, and let&apos;s create a
              brighter future together.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              {/* ---Name--- */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600 pt-2">Name is required</span>
                )}
              </div>

              {/* ---Photo--- */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600 pt-2">
                    PhotoURL is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600 pt-2">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 pt-2">
                    Password must be six characters
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600 pt-2">
                    Password must be less then twenty characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 pt-2">
                    Password must have one uppercase, one lowercase, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <div className="mx-8">
              <SocialLogin />
            </div>
            <p className="text-center mb-2">
              <small>
                Already have an account?{" "}
                <Link className="text-green-500 font-bold" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
