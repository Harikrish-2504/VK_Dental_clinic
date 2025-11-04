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

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await apiClient("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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
          {/* <div className="bg-[#fff] shadow-xl p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-semibold text-lg md:text-xl tracking-wide">
                Teeth Cleaning
              </h1>
              <span className="text-[#0792CE] md:text-4xl text-2xl">
                <IoArrowForwardCircle />
              </span>
            </div>
            <p className="max-w-[260px] tracking-wide font-normal text-md">
              We understand theimpact that your oral health can have on the
              well-being of your entire body. Diseases of the mouth have been
              linked to serious conditions like diabetes and high blood{" "}
            </p>
          </div> */}
          {services.map((service, index) => {
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
                    href={`/mainservice/${service._id}`} // ✅ dynamic route
                  >
                    <span className="text-[#0792CE] md:text-4xl text-2xl">
                      <IoArrowForwardCircle />
                    </span>
                  </Link>
                </div>
                {/* <p className="max-w-[260px] tracking-wide font-normal text-md">
                {service.description}
              </p> */}
                <p className="max-w-[260px] tracking-wide font-normal text-md whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer/>
    </>
  );
}
