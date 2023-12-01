import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo, newPassword) => {
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    // Update password if newPassword is provided
    if (newPassword) {
      await auth.currentUser.updatePassword(newPassword);
    }
    setLoading(false);
    return { success: true, error: null };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current User", currentUser);
      if (currentUser) {
        //get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data) {
            localStorage.setItem("access-token", res.data);
            setLoading(false);
          }
        });
      } else {
        //TODO: Remove token (if token stored in the client side: local storage, caching, in memory)
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    LogOut,
  };

  return (
    <AuthContext.Provider value={authInfo}> {children}</AuthContext.Provider>
  );
};

export default AuthProvider;
