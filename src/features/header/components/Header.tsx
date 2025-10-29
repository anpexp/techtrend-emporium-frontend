import { Link } from "react-router-dom";
import { getToken, getRole, setToken } from "@/core/auth/session";

export default function Header() {
  const isAuth = !!getToken();
  const role = getRole();

  return (
    <header style={{ borderBottom: "1px solid #eee", padding: "0.75rem 1rem" }}>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }} aria-label="Main">
        <Link to="/" aria-label="Home">TechTrend</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>

        {isAuth && <Link to="/orders">My Orders</Link>}
        {isAuth && (role === "employee" || role === "admin") && <Link to="/employee">Employee</Link>}
        {isAuth && role === "admin" && <Link to="/admin">Admin</Link>}

        <div style={{ marginLeft: "auto" }}>
          {isAuth ? (
            <button onClick={() => setToken(null)} aria-label="Logout">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
