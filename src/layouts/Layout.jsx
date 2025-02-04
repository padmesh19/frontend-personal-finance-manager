import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { selectUser } from "../redux/features/auth/userSlice";
import { Button } from "@/components/ui/button";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-slate-400 roboto">
      <nav className="bg-gradient-to-r from-blue-800 to-indigo-950 text-white py-4 px-8 fixed top-0 w-full flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src="/piggy-bank.png" width={28} />
            <h2 className="text-xl comic font-semibold truncate">
              Personal Finance Manager
            </h2>
          </Link>
        </div>

        <div className="flex items-center gap-4 font-semibold">
          {!user && (
            <Link to="/register" className="hover:-translate-y-1">
              Register
            </Link>
          )}
          {!user && (
            <Link to="/login" className="hover:-translate-y-1">
              Login
            </Link>
          )}
          {user && (
            <Button
              onClick={() => navigate("/profile", { replace: true })}
              variant="default"
            >
              Profile
            </Button>
          )}
          {user && (
            <Button
              onClick={() => navigate("/logout", { replace: true })}
              variant="destructive"
            >
              Logout
            </Button>
          )}
        </div>
      </nav>

      <main className="pt-20">{children}</main>
    </div>
  );
};

export default Layout;
