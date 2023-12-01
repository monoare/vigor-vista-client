import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ProfileSetting = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");

  const handleUpdateProfile = async () => {
    try {
      // Update user profile using updateUserProfile function
      await updateUserProfile(displayName, photoURL, newPassword);

      // Update additional user details on your server (assuming your API endpoint is correct)
      const updatedDoc = {
        name: user.displayName,
        photoURL: user.photoURL,
      };
      console.log("Updating server:", updatedDoc);

      // Make sure the API endpoint is correct, and user.email is a valid identifier for your user
      await axiosSecure.patch(`/users/update/${user.email}`, updatedDoc);

      // Show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your profile is updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Handle errors and show error message
      console.error("Error updating profile:", error.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error updating profile. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  console.log(user);
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold mb-6">Edit Profile</h1>
      <div className="mx-auto max-w-xs rounded-xl rotate-3 bg-slate-400 shadow-lg">
        <img
          className="max-w-xs mx-auto rounded-xl -rotate-3"
          src={user.photoURL}
          alt="user.photoURL"
        />
      </div>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <p className="text-lg pb-2">
          Last login time:{" "}
          <span className="font-semibold">{user.metadata.lastSignInTime}</span>
        </p>
        <p className="text-lg pb-2">
          Account created at:{" "}
          <span className="font-semibold">{user.metadata.creationTime}</span>
        </p>
        <p className="text-lg pb-2">
          Your Email: <span className="font-semibold">{user.email}</span>
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Display Name:</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Photo URL:</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetting;
