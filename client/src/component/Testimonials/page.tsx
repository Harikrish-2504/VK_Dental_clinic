"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import defaultProfile from "../../../public/images/defaultprofileimg.png";
import { apiClient } from "@/src/utlis/apiClinet";

interface TestimonialData {
  _id: string;
  name: string;
  place: string;
  comment: string;
  image?: {
    url?: string | null;
  };
}

export const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await apiClient("/testimonials", { method: "GET" }, false);
        setTestimonials(res.data || []);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Slider autoplay
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Loading Skeleton UI
  if (loading) {
    return (
      <section className="py-20" id="testimonial">
        <div className="container text-center">
          <div className="h-10 w-40 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-60 bg-gray-200 rounded-lg mx-auto mb-10 animate-pulse" />

          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse" />
          </div>

          <div className="h-4 w-80 bg-gray-200 rounded-lg mx-auto mt-6 animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded-lg mx-auto mt-2 animate-pulse" />
        </div>
      </section>
    );
  }

  // Empty state
  if (!loading && testimonials.length === 0) {
    return (
      <section className="py-20" id="testimonial">
        <div className="container text-center">
          <h3 className="text-xl font-medium text-gray-500">
            No testimonials available
          </h3>
        </div>
      </section>
    );
  }
  const trimText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
  const current = testimonials[index];

  return (
    <section className="py-20" id="testimonial">
      <div className="container">
        <div className="text-center md:mb-15 mb-7">
          <h4 className="text-md font-medium mb-3">Testimonials</h4>
          <h1 className="md:text-3xl text-xl font-semibold">
            What People Say About Us
          </h1>
        </div>

        <div className="flex items-center justify-between max-w-6xl mx-auto md:my-10 md:px-4">
          <span
            onClick={handlePrev}
            className="md:text-4xl text-2xl cursor-pointer text-gray-600 hover:text-black transition"
          >
            <BsArrowLeftCircle />
          </span>

          <div className="flex flex-col justify-center items-center gap-10 text-center overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex flex-col justify-center items-center gap-10 text-center"
              >
                <Image
                  src={current.image?.url || defaultProfile}
                  width={150}
                  height={150}
                  alt={current.name}
                  className="rounded-full object-cover"
                />

                <p className="max-w-[650px] font-[500] md:text-lg text-sm text-center">
                  {trimText(current.comment, 350)}
                </p>

                <div>
                  <h2 className="font-semibold text-lg">{current.name}</h2>
                  <h3 className="text-md text-gray-600">{current.place}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <span
            onClick={handleNext}
            className="md:text-4xl text-2xl cursor-pointer text-gray-600 hover:text-black transition"
          >
            <BsArrowRightCircle />
          </span>
        </div>
      </div>
    </section>
  );
};
