import React from "react";
import { Button } from "../ui/button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";
import { useDispatch } from "react-redux";
import { signInSucess } from "@/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const auth = getAuth(app); // Initialize Firebase Auth
  const dispatch = useDispatch(); // Redux dispatcher
  const navigate = useNavigate(); // React Router navigation

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const firebaseResponse = await signInWithPopup(auth, provider);
      const userName = firebaseResponse.user.displayName || "Unknown User"; // Fallback if name is undefined

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName, // Ensure name is always a string
          email: firebaseResponse.user.email,
          profilePhotoUrl: firebaseResponse.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSucess(data));
        navigate("/");
      } else {
        console.error(
          "Failed to authenticate with backend:",
          data.message || res.statusText
        );
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="w-full bg-green-500"
        onClick={handleGoogleClick} // Corrected camelCase
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
