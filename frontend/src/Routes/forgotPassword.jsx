import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

function PasswordRoutes() {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/" replace />;
  }


}

export default PasswordRoutes;