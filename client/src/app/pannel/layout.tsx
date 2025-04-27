"use client";
import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import Sidebar from "@/src/component/sidebar/page";
import Navbar from "@/src/component/Navbar/page";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

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
