// src/App.tsx
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/organisms/Header";
import type { UserLike } from "./components/molecules/UserDropdown";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeePortalPage from "./pages/EmployeePortalPage";
import CreateProductPage from "./pages/CreateProductPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";

// F-204
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";

// F-205
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";

/** Bridge so Header can read wishlist count from Favorites context */
function HeaderWithFavorites({
  user,
  onSearch,
  onGoToCart,
  onGoToWishlist,
  onSelectCurrency,
  onLogoClick,
}: {
  user: UserLike | null;
  onSearch: (q: string) => void;
  onGoToCart: () => void;
  onGoToWishlist: () => void;
  onSelectCurrency: () => void;
  onLogoClick: () => void;
}) {
  const { items } = useFavorites();
  return (
    <Header
      currency="USD"
      user={user}
      cartCount={3}
      wishlistCount={items.length}
      onSearch={onSearch}
      onGoToCart={onGoToCart}
      onGoToWishlist={onGoToWishlist}
      onSelectCurrency={onSelectCurrency}
      onLogoClick={onLogoClick}
    />
  );
}

export default function App() {
  const [user, setUser] = useState<UserLike | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  /** Rehydrate once on mount (only accept valid roles) */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = (localStorage.getItem("username") || undefined) as string | undefined;
    const role = localStorage.getItem("role") as UserLike["role"] | null;

    const validRole = role === "shopper" || role === "employee" || role === "admin";
    if (token && name && validRole) {
      setUser({ id: "u1", name, role: role! });
    } else {
      // Clean any stale auth that forces wrong redirects
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      setUser(null);
    }
  }, []);

  /** Rehydrate on each route change (e.g., after Login writes localStorage) */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = (localStorage.getItem("username") || undefined) as string | undefined;
    const role = localStorage.getItem("role") as UserLike["role"] | null;

    const validRole = role === "shopper" || role === "employee" || role === "admin";
    if (token && name && validRole) setUser({ id: "u1", name, role: role! });
    else setUser(null);
  }, [location.pathname]);

  // Header handlers
  const handleSearch = (q: string) => console.log("search:", q);
  const handleSelectCurrency = () => console.log("open currency selector");
  const handleLogoClick = () => navigate("/");
  const goCart = () => console.log("go to cart");
  const goWishlist = () => navigate("/favorites");

  // Role helpers
  const isEmployee = !!user && user.role === "employee";
  const isAdmin = !!user && user.role === "admin";
  const isShopper = !!user && user.role === "shopper";

  // 🔁 IMPORTANT: Always render Home on "/" (no auto-redirect)
  // Portal & create pages are protected below.
  return (
    <FavoritesProvider>
      <HeaderWithFavorites
        user={user}
        onSearch={handleSearch}
        onGoToCart={goCart}
        onGoToWishlist={goWishlist}
        onSelectCurrency={handleSelectCurrency}
        onLogoClick={handleLogoClick}
      />

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected: employee/admin */}
        <Route
          path="/employee-portal"
          element={isEmployee || isAdmin ? <EmployeePortalPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/create-product"
          element={isEmployee || isAdmin ? <CreateProductPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/create-category"
          element={isEmployee || isAdmin ? <CreateCategoryPage /> : <Navigate to="/" replace />}
        />

        {/* F-205 */}
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* Placeholder product detail */}
        <Route path="/product/:id" element={<div className="p-6">TODO: Product detail</div>} />

        {/* F-204: shopper-only */}
        <Route
          path="/my-orders"
          element={
            isShopper ? <MyOrdersPage /> : user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/my-orders/:orderId"
          element={
            isShopper ? <OrderDetailPage /> : user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FavoritesProvider>
  );
}
