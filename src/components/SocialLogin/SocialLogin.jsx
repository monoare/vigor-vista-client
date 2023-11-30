import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
        status: "Member",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div>
      <div className="divider mt-0 h-0 divider-info">Or</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn mb-2 w-full flex justify-between capitalize bg-green-200"
      >
        <FcGoogle className="text-green-500" />
        Google Login
      </button>
    </div>
  );
};

export default SocialLogin;
