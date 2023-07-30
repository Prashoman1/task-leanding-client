import React, { createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export const ContextProvider = createContext(null);

export default function Provider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setloading] = useState(true);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      fetch(`http://localhost:5000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
          setRefetch(true);
          setloading(false);
        });
    } else {
      setUser("");
      setloading(true);
    }
  }, [refetch]);

  const userInfo = {
    user,
    setUser,
    setRefetch,
    loading,
  };

  return (
    <ContextProvider.Provider value={userInfo}>
      {children}
    </ContextProvider.Provider>
  );
}
