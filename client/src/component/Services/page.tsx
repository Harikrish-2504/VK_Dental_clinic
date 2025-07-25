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
  return (
    <section className="bg-[#F5F5F5] py-20" id="service">
      <div className="container">
        <div className="">
          <p className="text-lg text-[#89DB7B] font-semibold mb-3">
            Satisfy Solution
          </p>
          <h2 className="text-3xl font-semibold tracking-wide leading-6">
            The Best Dental Treatment
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:py-10 py-5 gap-4">
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
          {services.slice(0, 4).map((service) => (
            <div
              key={service._id}
              className="bg-[#fff] shadow-xl p-6 rounded-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-lg md:text-xl tracking-wide">
                  {service.title}
                </h1>
                <span className="text-[#0792CE] md:text-4xl text-2xl">
                  <IoArrowForwardCircle />
                </span>
              </div>
              <p className="max-w-[260px] tracking-wide font-normal text-md">
                {service.description}
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
