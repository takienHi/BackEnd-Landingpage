import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import paths from 'src/constant/paths';
import { AppContext } from 'src/contexts/app.context';

export function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  console.log('ProtectedRoute', isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login.link} />;
}

export function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  // console.log(isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to={paths.dashboard.link} />;
}

export function CheckAuth() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Navigate to={paths.dashboard.link} /> : <Navigate to={paths.login.link} />;
}
