import { JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRouteAdmin({ children }: Props) {
  const { user, isLoading } = useAuth();
  const userRole = user?.role.toLowerCase();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (userRole !== "admin") {
    return <Navigate to="/not-access" replace />;
  }

  return children;
}
