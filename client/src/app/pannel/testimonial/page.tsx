"use client";
import { useState } from "react";
import Image from "next/image";
import testimonialImg from "../../../../public/images/testimonial.png";

export default function Testimonial() {
  const [showForm, setShowForm] = useState(false);

  const testimonials = [
    {
      img: testimonialImg,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "David Gahan",
      location: "Detroit, Michigan",
    },
    {
      img: testimonialImg,
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      name: "Sarah Johnson",
      location: "Los Angeles, California",
    },
    {
      img: testimonialImg,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      name: "Michael Smith",
      location: "New York, USA",
    },
  ];

  return (
    <section className="lg:ml-60 py-20" id="testimonial">
      <div className="container">
        <div className="text-center md:mb-15 mb-7">
          <h4 className="text-md font-medium mb-3">Testimonials</h4>
          <h1 className="md:text-3xl text-xl font-semibold">
            What People Say About Us
          </h1>
        </div>

        {/* Add Button */}
        <div className="flex justify-end lg:my-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#44BBEE] text-white font-medium md:text-lg text-sm py-3 md:px-7 px-4 rounded-xl"
          >
            ADD
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:py-10 py-5 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 shadow-md rounded-2xl hover:shadow-lg transition"
            >
              <Image
                src={item.img}
                width={100}
                height={100}
                alt={item.name}
                className="rounded-full mb-4 object-cover"
              />
              <p className="text-sm md:text-base text-gray-700 mb-4 max-w-[350px]">
                {item.text}
              </p>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <h3 className="text-sm text-gray-500">{item.location}</h3>
            </div>
          ))}
        </div>

        {/* Popup Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 rounded-2xl w-[90%] md:w-[400px] shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Add Testimonial
              </h2>

              <form className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="border rounded-lg p-2"
                />
                <textarea
                  name="text"
                  placeholder="Enter testimonial"
                  className="border rounded-lg p-2"
                  required
                />
                <input
                  name="name"
                  placeholder="Enter name"
                  className="border rounded-lg p-2"
                  required
                />
                <input
                  name="location"
                  placeholder="Enter Place"
                  className="border rounded-lg p-2"
                  required
                />

                <div className="flex justify-between mt-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#44BBEE] text-white px-4 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
