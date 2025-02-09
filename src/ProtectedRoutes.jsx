import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLoader, userState } from "./redux/features/userSlice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { fetchBudget } from "./redux/features/budgetSlice";
import { fetchCategory } from "./redux/features/categorySlice";
import { fetchTransaction } from "./redux/features/transactionSlice";
import { fetchGoal } from "./redux/features/goalSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading } = useSelector(userState);

  useEffect(() => {
    if (!user) {
      dispatch(authLoader());
      dispatch(fetchBudget());
      dispatch(fetchCategory());
      dispatch(fetchTransaction());
      dispatch(fetchGoal());
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] no-scrollbar flex items-center justify-center">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" size={40} color="orange" />
          <div className="text-slate-700 text-semibold text-md">Loading...</div>
        </div>
      </div>
    );
  }
  if (!user && !["/login", "/register", "/"].includes(location.pathname)) {
    return <Navigate to="/login" replace relative state={{ from: location }} />;
  }
  if (user && ["/login", "/register", "/"].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
