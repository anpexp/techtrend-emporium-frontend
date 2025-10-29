export function getToken() {
  return localStorage.getItem("token");
}
export function setToken(token: string | null, role?: string) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
  if (role) localStorage.setItem("role", role);
}
export function getRole() {
  return localStorage.getItem("role") ?? "shopper";
}
