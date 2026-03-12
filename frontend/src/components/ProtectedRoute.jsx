import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // 1. If we are still checking the session, return a loader.
  // This prevents the redirect from triggering before the auth check completes.
  if (loading) {
    return <div className="loading-spinner">Verifying your session...</div>;
  }

  // 2. Only if loading is finished and there is no user, redirect.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Authenticated!
  return children;
};

export default ProtectedRoute;