import { Navigate, useLocation } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import useTrainer from "../Hooks/useTrainer";
import useAuth from "../Hooks/useAuth";

const TrainerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isTrainer, isTrainerLoading] = useTrainer();
  const location = useLocation();

  if (loading || isTrainerLoading) {
    return (
      <div className="flex justify-center items-center mt-28">
        <FadeLoader size={250} color="#36d7b7" />
      </div>
    );
  }

  if (user && isTrainer) {
    return children;
  }

  // Redirect to the home page if the user is not a trainer
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default TrainerRoute;
