import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMember = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  //   console.log("useMember", user);

  // Fetch member data
  const { data: isMember, isPending: isMemberLoading } = useQuery({
    enabled: !loading,
    queryKey: ["Member", user?.email, "res"],
    queryFn: async () => {
      if (!user || !user.email) {
        console.error("User or user email is not available.");
        return false; // Return a default value
      }

      try {
        const res = await axiosSecure.get(`/users/member/${user.email}`); // Update the route here
        // console.log("Member", res.data?.status);
        return res.data?.status;
      } catch (error) {
        console.error("Error fetching trainer data:", error);
        // Return a default value or handle the error gracefully
        return false; // For example, assuming 'false' indicates not a trainer
      }
    },
  });

  //   console.log(isMember);

  return [isMember, isMemberLoading];
};

export default useMember;
