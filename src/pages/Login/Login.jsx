import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import loginImg from "../../assets/image/login.avif";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signIn(email, password).then(() => {
      // const user = result.user;
      // console.log(user);
      Swal.fire({
        title: "Good job!",
        text: "User login Successful!",
        icon: "success",
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <Helmet>
        <title>Vigor Vista | Login</title>
      </Helmet>

      <div
        className="hero min-h-screen bg-base-200"
        style={{
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <div className="hero-content flex-col md:flex-row">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-xl pt-16 md:pt-0 md:text-5xl font-bold text-white">
              Login now!
            </h1>
            <p className="py-6 text-xs md:text-xl font-medium text-white">
              Unlock the door to your personalized experience – where security
              meets seamless access. Your journey begins with a secure login,
              ensuring your path is safeguarded as you explore the possibilities
              within.
            </p>
          </div>
          <div className="card w-full md:w/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body text-sm">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={false}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>

            <div className="mx-8">
              <SocialLogin />
            </div>
            <p className="text-center pb-2">
              <small>
                New Here?{" "}
                <Link className="text-red-500 font-bold" to="/signUp">
                  Create an account
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
