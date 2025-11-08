"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MainNavbar from "../../component/mainNavbar/page";

import { apiClient } from "@/src/utlis/apiClinet";
import Footer from "@/src/component/Footer/page";
export default function maingallery() {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const fetchGalleryImages = async () => {
    try {
      const res = await apiClient("/gallery");
      if (res.success) {
        setGalleryImages(res.data);
      } else {
        console.error("Failed to load gallery");
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };
  useEffect(() => {
    fetchGalleryImages();
  }, []);
  return (
    <>
      <MainNavbar />
      <section className="bg-[#eff9eb] py-20">
        <div className="container">
          <div className="">
            <h1 className="font-semibold text-4xl md:mb-8 mb-4 tracking-wide text-[#595858]">
              Gallery
            </h1>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 justify-items-center ">
            {galleryImages.map((item, index) => (
              <div
                key={item._id || index}
                className="lg:w-[450px] w-[350px] lg:h-[390px] h-[290px] overflow-hidden"
              >
                <Image
                  src={item.image.url}
                  alt={`gallery-${index}`}
                  width={405}
                  height={270}
                  className="w-full h-full object-cover rounded-lg" // or object-contain
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center md:mt-20 mt-10">
            <button className="flex items-center gap-2 bg-[#E68120] text-white md:px-4 px-3 py-3 rounded-lg text-[10px] md:text-[15px]">
            Load More
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
