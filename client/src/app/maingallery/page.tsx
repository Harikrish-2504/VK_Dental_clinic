"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MainNavbar from "../../component/mainNavbar/page";
import galleryone from "../../../public/images/galleryone.png";
import gallerytwo from "../../../public/images/gallerytwo.png";
import gallerythree from "../../../public/images/gallerythree.png";
import galleryfour from "../../../public/images/galleryfour.png";
import galleryfive from "../../../public/images/galleryfive.png";
export default function maingallery() {
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
            {[galleryone, gallerythree, gallerytwo, galleryfour, galleryfive, galleryone].map((img, index) => (
              <div key={index} className="lg:w-[450px] w-[350px] lg:h-[390px] h-[290px] overflow-hidden">
                <Image
                  src={img}
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
              View More
            </button>
          </div>
        </div>
      </section>
        </>
    )
}