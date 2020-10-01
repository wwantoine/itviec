import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("test", isAuthenticated);
  if (
    // isAuthenticated ===
    true
  ) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
