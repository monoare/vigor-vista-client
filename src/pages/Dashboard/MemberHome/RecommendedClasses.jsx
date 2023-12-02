import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const RecommendedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   console.log(user.email);

  // const { data: activityData = [] } = useQuery({
  //   queryKey: ["activityData", user.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/paidMembers/${user?.email}`);
  //     return res.data;
  //   },
  // });

  // console.log(activityData);

  // const { data: recommendedClasses = [] } = useQuery({
  //   queryKey: ["recommendedClasses"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/classes/${activityData}`);
  //     return res.data;
  //   },
  // });

  // console.log(recommendedClasses);

  return (
    <div>
      <p>This is recommended classes page</p>
    </div>
  );
};

export default RecommendedClasses;
