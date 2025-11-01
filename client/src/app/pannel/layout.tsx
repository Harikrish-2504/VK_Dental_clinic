"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
import Sidebar from "@/src/component/sidebar/page";
import Navbar from "@/src/component/Navbar/page";
import { apiClient } from "@/src/utlis/apiClinet";
import InitialLoader from "@/src/component/initialloader/page";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        // Optional: verify with backend
        await apiClient("/auth/verify", { method: "GET" }, true);
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (loading) return <InitialLoader />;

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex h-screen pt-[93px]">
          <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
          <main
            className={`flex-1 px-4 py-6 bg-[#eff9eb] overflow-y-auto transition-all duration-300`}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
