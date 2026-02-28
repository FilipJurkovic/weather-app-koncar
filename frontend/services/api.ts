const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Dohvati token iz localStoragea ako postoji
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // Ako je 401 - token je istekao, odjavi korisnika
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? "Greška na serveru.");
  }

  return response.json();
}
