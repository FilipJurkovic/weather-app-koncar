"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { username, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/history", label: "Povijest" },
    { href: "/stats", label: "Statistike" },
  ];

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <span className="font-bold text-blue-600 text-lg">WeatherApp</span>
            <div className="flex gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition hover:text-blue-600 ${
                    pathname === link.href ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{username}</span>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 transition">
              Odjava
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
