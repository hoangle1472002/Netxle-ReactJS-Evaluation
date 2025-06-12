import React from 'react';
import { Navigate } from 'react-router-dom'; 

function ProtectedRoute({ children }) {
    const accessToken = true;

    if (!accessToken) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}

export default ProtectedRoute;