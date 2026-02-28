import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AuthInitializer from "./components/AuthInitializer";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Vremenska prognoza",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body className={`${geist.className} bg-gray-50 text-gray-900`}>
        <AuthInitializer />
        {children}
      </body>
    </html>
  );
}
