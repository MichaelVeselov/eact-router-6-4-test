import { useLocation, Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const RequireAuth = (props) => {
  const { children } = props;

  const location = useLocation();

  const { user } = useAuth();

  if (!user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
