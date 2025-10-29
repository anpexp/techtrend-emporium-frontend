import { Outlet } from "react-router-dom";
import Header from "@/features/header/components/Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}
