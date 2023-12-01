import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useMember from "../Hooks/useMember";
import { FadeLoader } from "react-spinners";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isMember, isMemberLoading] = useMember();
  const location = useLocation();

  if (loading || isMemberLoading) {
    return (
      <div className="flex justify-center items-center mt-28">
        <FadeLoader size={250} color="#36d7b7" />
      </div>
    );
  }

  if (user && isMember) {
    return children;
  }

  // Redirect to the home page if the user is not a trainer
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default MemberRoute;
