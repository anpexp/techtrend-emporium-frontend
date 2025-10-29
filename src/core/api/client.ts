// Pequeño wrapper con fetch; ya listo para JWT cuando conectes backend.
import { API_URL } from "@/core/config/env";
import { getToken } from "@/core/auth/session";

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
