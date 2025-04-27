"use client";
import Link from "next/link";
import logo from "../../../public/images/Logo.png";
import React from "react";
import { usePathname } from "next/navigation"; // ✅ CORRECT FOR APP ROUTER

export default function Sidebar({ isOpen, closeSidebar }: { isOpen: boolean, closeSidebar: () => void })  {
  const pathname = usePathname(); // ✅ Get the current path

  const isActive = (path: string) => pathname === path;

  return (
  <aside className={`bg-white p-4 fixed top-[93px]  z-40 h-full w-64 transition-transform duration-300 ease-in-out flex flex-col lg:gap-y-80 gap-y-48
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
  {/* Adjust 'top' based on navbar height */}

      <div className="flex flex-col gap-5 justify-center items-center pt-8">
        <Link href="/pannel/gallery" onClick={closeSidebar}>
          <button
            className={`${isActive("/pannel/gallery") ? "bg-[#A45D19]" : "bg-[#E68120]"
              } text-white py-4 px-15 rounded-xl font-medium`}
          >
            Gallery
          </button>
        </Link>

        <Link href="/pannel/service" onClick={closeSidebar}>
          <button
            className={`${isActive("/pannel/service") ? "bg-[#A45D19]" : "bg-[#E68120]"
              } text-white py-4 px-15 rounded-xl font-medium`}
          >
            Service
          </button>
        </Link>

        <button className="bg-[#E68120] text-white font-medium  py-4 px-15 rounded-xl lg:hidden">
          LogOut
        </button>
      </div>

      <Link href="/pannel/passwordandemail" onClick={closeSidebar}>
        <button   className={`${isActive("/pannel/passwordandemail") ? "text-[#ed634b]" : "text-[#e5c329]"
              }   font-semibold`}
          >
          Change Password and Email?
        </button>
      </Link>
      
    </aside>
  );
}
