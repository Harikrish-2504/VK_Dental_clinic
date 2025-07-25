"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  console.log("user", user, loading);
  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  if (loading || user?.role !== "admin") return null;

  return <>{children}</>;
}
