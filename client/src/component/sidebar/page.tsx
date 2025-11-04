"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    closeSidebar();
    setTimeout(() => {
      router.push(path);
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <>
      {/* Fullscreen orange loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-[9999]">
          <div className="w-10 h-10 border-4 border-[#E68120] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <aside
        className={`bg-white p-4 fixed top-[93px] z-40 h-full w-64 transition-transform duration-300 ease-in-out flex flex-col lg:gap-y-80 gap-y-48 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col gap-5 justify-center items-center pt-8">
          <button
            onClick={() => handleNavigation("/pannel/gallery")}
            className={`${
              isActive("/pannel/gallery") ? "bg-[#A45D19]" : "bg-[#E68120]"
            } text-white py-4 px-15 rounded-xl font-medium w-full`}
          >
            Gallery
          </button>

          <button
            onClick={() => handleNavigation("/pannel/service")}
            className={`${
              isActive("/pannel/service") ? "bg-[#A45D19]" : "bg-[#E68120]"
            } text-white py-4 px-15 rounded-xl font-medium w-full`}
          >
            Service
          </button>

          <button
            onClick={() => handleNavigation("/pannel/testimonial")}
            className={`${
              isActive("/pannel/testimonial") ? "bg-[#A45D19]" : "bg-[#E68120]"
            } text-white py-4 px-15 rounded-xl font-medium w-full`}
          >
            Testimonial
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`bg-[#E68120] text-white font-medium py-4 px-15 rounded-xl lg:hidden flex items-center justify-center gap-2 transition-all duration-300 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#cf6c13]"
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging out...
              </>
            ) : (
              "LogOut"
            )}
          </button>
        </div>

        <button
          onClick={() => handleNavigation("/pannel/passwordandemail")}
          className={`${
            isActive("/pannel/passwordandemail")
              ? "text-[#ed634b]"
              : "text-[#e5c329]"
          } font-semibold`}
        >
          Change Password and Email?
        </button>
      </aside>
    </>
  );
}
