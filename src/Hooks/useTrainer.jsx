import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  console.log(user);

  // Fetch trainers data
  const { data: isTrainer, isPending: isTrainerLoading } = useQuery({
    enabled: !loading,
    queryKey: ["Trainer", user?.email],
    queryFn: async () => {
      if (!user || !user.email) {
        console.error("User or user email is not available.");
        return false; // Return a default value
      }

      try {
        const res = await axiosSecure.get(`/trainers/train/${user.email}`); // Update the route here
        return res.data?.status;
      } catch (error) {
        console.error("Error fetching trainer data:", error);
        // Return a default value or handle the error gracefully
        return false; // For example, assuming 'false' indicates not a trainer
      }
    },
  });

  return [isTrainer, isTrainerLoading];
};

export default useTrainer;
