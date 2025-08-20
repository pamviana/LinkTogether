import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredPermission?: string;
}

export function ProtectedRoute({
  children,
  requiredPermission,
}: ProtectedRouteProps) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !user.permissions?.includes(requiredPermission)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
