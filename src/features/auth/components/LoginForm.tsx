import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setToken } from "@/core/auth/session";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
  remember: z.boolean().optional(),
});
type Form = z.infer<typeof schema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isValid } } =
    useForm<Form>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = async (data: Form) => {
    // TODO: reemplaza por llamada real a tu backend
    // Si ok: guarda token y, opcionalmente, rol.
    setToken("demo-token", "admin"); // "employee" o "shopper"
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register("email")} aria-invalid={!!errors.email}/>
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" {...register("password")} aria-invalid={!!errors.password}/>
      {errors.password && <p role="alert">{errors.password.message}</p>}

      <label style={{ display: "inline-flex", gap: ".5rem", alignItems: "center" }}>
        <input type="checkbox" {...register("remember")} /> Remember me
      </label>

      <button disabled={!isValid} style={{ display: "block", marginTop: "1rem" }}>
        Login
      </button>
    </form>
  );
}
