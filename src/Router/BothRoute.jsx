import React, { useContext } from "react";
import { ContextProvider } from "../Providers/Provider";
import Loading from "../Pages/Home/Loading/Loading";
import { Navigate } from "react-router-dom";

export default function BothRoute({ children }) {
  const { user, loading } = useContext(ContextProvider);

  if (loading) {
    return <Loading></Loading>;
  }
  if (user.role === "user" || user.role === "admin") {
    return children;
  }
  return <Navigate to="/login" replace={true}></Navigate>;
}
