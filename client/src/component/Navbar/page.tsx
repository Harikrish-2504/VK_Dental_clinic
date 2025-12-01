"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function Navbar({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    router.push("/");
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        {/* Logo & Logout bar */}
        <div className="flex justify-between items-center md:px-4  bg-white ">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-2xl text-[#E68120] right-5 absolute"
          >
            {isSidebarOpen ? (
              <FiX className="text-3xl" />
            ) : (
              <FiMenu className="text-3xl" />
            )}
          </button>

          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={180} height={50} className="w-34 lg:w-40 object-cover"/>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-[#E68120] text-white font-medium text-18 px-14 py-4 rounded-2xl lg:block hidden"
          >
            LogOut
          </button>
        </div>
      </div>
    </>
  );
}
