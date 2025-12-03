"use client";

import { apiClient } from "@/src/utlis/apiClinet";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
interface ServiceData {
  _id: string;
  title: string;
  description: string;
}
function Services() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  const trimText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
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
    <section className="bg-[#F5F5F5] py-20" id="service">
      <div className="container">
        <div className="">
          <p className="text-lg text-[#89DB7B] font-semibold mb-3">
            Satisfy Solution
          </p>
          <h2 className="lg:text-3xl text-xl font-semibold tracking-wide leading-6">
            The Best Dental Treatment
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:py-10 py-5 gap-4">
          {loading
            ? [1, 2, 3, 4].map((s) => <SkeletonCard key={s} />)
            : services.slice(0, 4).map((service) => (
                <div
                  key={service._id}
                  className="bg-[#fff] shadow-xl p-6 rounded-2xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold text-lg md:text-xl tracking-wide">
                      {service.title}
                    </h1>
                    <Link href="/mainservice">
                      <span className="text-[#0792CE] md:text-4xl text-2xl">
                        <IoArrowForwardCircle />
                      </span>
                    </Link>
                  </div>
                  <p className="max-w-[260px] tracking-wide font-normal text-md">
                    {trimText(service.description, 225)}
                  </p>
                </div>
              ))}
        </div>
        <div className="flex gap-4 justify-end">
          <Link href="/mainservice">
            <button className="flex items-center gap-2 bg-[#E68120] text-white md:px-2 px-3 py-3 rounded-lg text-[10px] md:text-[15px] font-semibold">
              View More <MdArrowOutward className="text-xl" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
