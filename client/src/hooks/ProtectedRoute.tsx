"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/src/utlis/apiClinet";
import InitialLoader from "../component/initialloader/page";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        // Optional backend verification for token validity
        await apiClient("/auth/verify", { method: "GET" }, true);
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/admin/login");
      }
    };

    verifyUser();
  }, [router]);

  if (loading) return <InitialLoader />;

  return <>{children}</>;
}
