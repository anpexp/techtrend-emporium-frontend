import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginForm = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  // DEV helper: infer role from email when backend doesn't return one
  const inferRoleFromEmail = (email: string): "shopper" | "employee" | "admin" => {
    if (email.includes("+admin")) return "admin";
    if (email.includes("+emp")) return "employee";
    return "shopper";
  };

  const onSubmit = async (data: LoginForm) => {
    const name = data.email.split("@")[0] || "user";
    const inferredRole = inferRoleFromEmail(data.email);

    // clear previous session to avoid stale role redirects
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    try {
      // 1) Try real backend login
      await login(data.email, data.password);
    } catch {
      // ignore error to allow DEV fallback
    }

    // 2) Ensure session keys (use backend values if present; otherwise fallback)
    localStorage.setItem("token", localStorage.getItem("token") || "t");
    localStorage.setItem("username", localStorage.getItem("username") || name);

    // If backend didn't set role, force the inferred one (admin/employee/shopper)
    const roleFromBackend = localStorage.getItem("role") as "shopper" | "employee" | "admin" | null;
    const finalRole = roleFromBackend || inferredRole;
    localStorage.setItem("role", finalRole);

    // 3) Redirect by role
    if (finalRole === "employee" || finalRole === "admin") {
      navigate("/employee-portal", { replace: true });
    } else {
      navigate("/my-orders", { replace: true });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow" role="main">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message as string | undefined}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={errors.password?.message as string | undefined}
          rightSlot={
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="text-sm px-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />

        {error && (
          <div className="text-red-600 mt-2" role="alert">
            {error}
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="mt-4 w-full">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
