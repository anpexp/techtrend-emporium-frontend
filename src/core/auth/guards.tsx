import { Navigate } from "react-router-dom";
import { getToken, getRole } from "./session";
import type { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const isAuth = !!getToken();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export function RequireRole({ children, roles }: { children: ReactNode; roles: string[] }) {
  const isAuth = !!getToken();
  const role = getRole();
  if (!isAuth) return <Navigate to="/login" replace />;
  if (!roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}
