import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "A Game",
  description:
    "A small browser-based third-person adventure built with React Three Fiber and Rapier physics — run through the world and collect all 5 scrolls.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a2b22",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
