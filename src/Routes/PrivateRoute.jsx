import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FadeLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <FadeLoader
        className="flex justify-center items-center"
        size={250}
        color="#36d7b7"
      />
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
