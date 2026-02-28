import { AuthResponse } from "@/types";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;

  setAuth: (data: AuthResponse) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  email: null,
  isAuthenticated: false,

  setAuth: (data) => {
    // Spremi u localStorage za API pozive
    localStorage.setItem("token", data.token);
    // Spremi u cookie za middleware (zaštita ruta)
    document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    set({
      token: data.token,
      username: data.username,
      email: data.email,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    // Obriši cookie
    document.cookie = "token=; path=/; max-age=0";
    set({
      token: null,
      username: null,
      email: null,
      isAuthenticated: false,
    });
  },

  initAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      set({
        token,
        username: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        isAuthenticated: true,
      });
    }
  },
}));
