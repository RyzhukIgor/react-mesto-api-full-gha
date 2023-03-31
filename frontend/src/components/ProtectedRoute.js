import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
    const { isLoggedIn, children } = props;
    return (isLoggedIn ? children : <Navigate to="/sign-in" replace />)
}
