import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLoader, userState } from './redux/features/auth/userSlice';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector(userState);
  const location = useLocation();

  const { user, isLoading } = userSelector;

  useEffect(() => {
    if (!user) {
      dispatch(authLoader());
    }

  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='animate-spin' size={70} />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user && ["/login", "/register",'/'].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
