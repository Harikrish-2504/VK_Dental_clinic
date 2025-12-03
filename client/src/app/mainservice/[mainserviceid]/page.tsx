"use client";

import { useParams, notFound } from "next/navigation";
import MainNavbar from "../../../component/mainNavbar/page";
import { apiClient } from "@/src/utlis/apiClinet";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

interface ServiceData {
  _id: string;
  id: string;
  title: string;
  description: string;
}

export default function Mainserviceid() {
  const params = useParams();
  const mainserviceid = Array.isArray(params.mainserviceid)
    ? params.mainserviceid[0]
    : params.mainserviceid;

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await apiClient("/services");
        const found = res.data.find(
          (s: ServiceData) => s._id === mainserviceid
        );
        setService(found || null);
      } catch (err) {
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    };

    if (mainserviceid) {
      fetchService();
    }
  }, [mainserviceid]);

  if (loading) {
    return (
      <>
        <MainNavbar />
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 md:px-10 pt-24 flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="h-10 w-40 bg-gray-200 rounded-full mb-6 animate-pulse" />
            <div className="h-6 w-72 bg-gray-200 rounded-full mb-10 animate-pulse" />
            <div className="h-64 w-full bg-gray-200 rounded-3xl animate-pulse" />
          </div>
        </div>
      </>
    );
  }

  // ❌ not found AFTER fetch finished
  if (!service) {
    return notFound();
  }

  // ✅ show page
  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 md:px-10 pt-12 pb-12 flex justify-center">
        <div className="w-full max-w-5xl space-y-6">
          {/* Top bar with back button */}
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/mainservice"
              className="inline-flex items-center gap-2 text-sm md:text-base text-sky-700 hover:text-sky-900 transition"
            >
              <IoArrowBack className="text-lg" />
              <span>Back to all services</span>
            </Link>
          </div>

          {/* Title + small subtitle line */}
          <header className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight">
              {service.title}
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Learn more about this service and how it can help you.
            </p>
          </header>

          {/* Main content card */}
          <section className="bg-white shadow-xl rounded-3xl border border-slate-100 p-6 md:p-10">
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">
              Service Overview
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700 whitespace-pre-line">
              {service.description}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
