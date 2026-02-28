"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthInitializer() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return null; // Ne renderira ništa, samo inicijalizira auth state
}
