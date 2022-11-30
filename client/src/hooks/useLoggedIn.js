import { useState, useEffect } from "react";

export default function UseLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  //    user = {
  //     name: existingUser.name,
  //     email: existingUser.email,
  //     role: existingUser.role,
  //     id: existingUser._id,
  //     token: token,
  //   };

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      setIsLoggedIn(true);
      setUserProfile(JSON.parse(localStorage.getItem("profile")));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);
  return { isLoading, isLoggedIn, userProfile };
}
