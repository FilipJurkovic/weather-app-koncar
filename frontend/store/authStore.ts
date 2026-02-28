import { AuthResponse } from "@/types";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;

  setAuth: (data: AuthResponse) => void;
  logout: () => void;
  initAuth: () => void; // čita token iz localStoragea pri učitavanju stranice
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  email: null,
  isAuthenticated: false,

  setAuth: (data) => {
    localStorage.setItem("token", data.token);
    set({
      token: data.token,
      username: data.username,
      email: data.email,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      username: null,
      email: null,
      isAuthenticated: false,
    });
  },

  // Poziva se pri učitavanju app-a da hydratizira state iz localStoragea
  initAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Dekodiraj JWT payload da dobiješ username i email
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
