import { Navigate, useLocation } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const isAdmin = user && user.email === "a@b.com"; // Check if the user's email is the admin email
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-28">
        <FadeLoader size={250} color="#36d7b7" />
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  // Redirect to the home page if the user is not an admin
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
