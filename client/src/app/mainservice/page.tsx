"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import MainNavbar from "../../component/mainNavbar/page";
import { IoArrowForwardCircle } from "react-icons/io5";
import { apiClient } from "@/src/utlis/apiClinet";
import Footer from "@/src/component/Footer/page";
interface ServiceData {
  _id: string;
  title: string;
  description: string;
}
export default function mainservice() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await apiClient("/services");
      setServices(res.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };
  const SkeletonCard = () => (
    <div className="bg-white shadow-xl p-6 rounded-2xl animate-pulse h-full">
      {/* Title + Icon row */}
      <div className="flex justify-between items-center mb-4">
        {/* Fake title */}
        <div className="h-6 w-32 bg-gray-200 rounded-md" />

        {/* Fake icon */}
        <div className="h-10 w-10 bg-gray-200 rounded-full" />
      </div>

      {/* Fake description (3 lines) */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded-md" />
        <div className="h-4 w-10/12 bg-gray-200 rounded-md" />
        <div className="h-4 w-8/12 bg-gray-200 rounded-md" />
      </div>
    </div>
  );

  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="mt-20">
          <p className="lg:text-4xl md:text-2xl text-xl text-[#89DB7B] font-semibold mb-5">
            Services
          </p>
          <h2 className="lg:text-3xl md:text-xl text-lg font-semibold tracking-wide leading-6">
            The Best Dental Treatment
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:py-10 py-3 gap-8">
          {loading
            ? [1, 2, 3, 4].map((s) => <SkeletonCard key={s} />)
            : services.map((service, index) => {
                const words = service.description.split(" ");
                const isLong = words.length > 25;
                const shortText = words.slice(0, 25).join(" ") + "...";
                const isExpanded = expandedIndex === index;

                return (
                  <div
                    key={service._id}
                    className="bg-[#fff] shadow-xl p-6 rounded-2xl"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="font-semibold text-lg md:text-xl tracking-wide">
                        {service.title}
                      </h1>
                      <Link
                        key={service._id}
                        href={`/mainservice/${service._id}`}
                      >
                        <span className="text-[#0792CE] md:text-4xl text-2xl">
                          <IoArrowForwardCircle />
                        </span>
                      </Link>
                    </div>

                    {/* DESCRIPTION WITH EXPAND / COLLAPSE */}
                    <p className="max-w-[260px] tracking-wide font-normal text-md whitespace-pre-line">
                      {isExpanded ? service.description : shortText}
                    </p>

                    {/* TOGGLE BUTTON */}
                    {isLong && (
                      <button
                        className="text-blue-600 mt-2 font-medium text-sm"
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }
                      >
                        {isExpanded ? "Read Less ▲" : "Read More ▼"}
                      </button>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
      <Footer />
    </>
  );
}
