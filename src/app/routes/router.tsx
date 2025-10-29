import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import { RequireAuth, RequireRole } from "@/core/auth/guards";
import LandingPage from "@/features/catalog/pages/LandingPage";
import ListPage from "@/features/catalog/pages/ListPage";
import DetailPage from "@/features/catalog/pages/DetailPage";
import MyOrdersPage from "@/features/orders/pages/MyOrdersPage";
import WishlistPage from "@/features/wishlist/pages/WishlistPage";
import EmployeePortalPage from "@/features/employee/pages/PortalPage";
import AdminPortalPage from "@/features/admin/pages/PortalPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import ForgotPage from "@/features/auth/pages/ForgotPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "shop", element: <ListPage /> },
      { path: "product/:id", element: <DetailPage /> },
      { path: "orders", element: <RequireAuth><MyOrdersPage /></RequireAuth> },
      { path: "wishlist", element: <RequireAuth><WishlistPage /></RequireAuth> },
      { path: "employee", element: <RequireRole roles={["employee","admin"]}><EmployeePortalPage /></RequireRole> },
      { path: "admin", element: <RequireRole roles={["admin"]}><AdminPortalPage /></RequireRole> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/forgot", element: <ForgotPage /> },
  { path: "*", element: <Navigate to="/" replace /> }
]);

// Nota: el truco as any es para evitar que TypeScript se queje con el lazy() + wrappers. Más adelante puedes cambiar a rutas sin lazy o crear contenedores intermedios.
