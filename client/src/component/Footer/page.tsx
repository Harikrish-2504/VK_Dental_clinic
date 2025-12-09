"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md"
export default function Footer() {
    const [activeSection, setActiveSection] = useState("home");
    return (
        <>
            <footer className="bg-[#eff9eb] ">
                <div className="border border-[#0792CE] w-full"></div>
                <div className="container">
                    <div
                        className="relative w-full   "
                        style={{
                            backgroundImage: "url(/project-bg.png)",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="">
                            <div className="md:py-16 py-10 px-6">
                                <div className="grid lg:grid-cols-3  grid-cols-1 lg:place-items-start items-center  md:gap-15 gap-10">
                                    <div className=" flex flex-col lg:items-center md:gap-10 gap-5">
                                        <Image
                                            src="/images/Logo.png"
                                            alt="Logo"
                                            width={250}
                                            height={50}
                                            className=" transform transition-transform duration-300 hover:scale-105 "
                                        />
                                        <div className="">
                                            <p className="text-[#070B00] md:text-md text-sm font-semibold lg:text-center mb-3 ">
                                                Follow Us
                                            </p>
                                            <div className="flex  md:gap-3 gap-2">
                                                <a
                                                    href="https://www.facebook.com/yourpage"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaFacebook className="md:text-2xl text-lg" />
                                                </a>
                                                <a
                                                    href="https://www.instagram.com/yourprofile"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaTwitter className="md:text-2xl text-lg" />
                                                </a>
                                                <a
                                                    href="https://www.linkedin.com/in/yourprofile"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaInstagram className="md:text-2xl text-lg" />
                                                </a>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="flex flex-col md:gap-4 gap-2 items-start ">
                                        <button className="font-medium text-sm md:text-lg text-[#070B00]">
                                            {" "}
                                            <a
                                                href="/"
                                                className={`hover:text-[#E68120] ${activeSection === "home" ? "text-[#E68120] " : ""
                                                    }`}
                                            >
                                                Home
                                            </a>
                                        </button>
                                      
                                        <button className="font-medium text-sm md:text-lg text-[#070B00]">
                                            {" "}
                                            <a
                                                href="#about"
                                                className={`hover:text-[#E68120] ${activeSection === "about" ? "text-[#E68120] " : ""
                                                    }`}
                                            >
                                                About Us
                                            </a>
                                        </button>
                                        <button className="font-medium text-sm md:text-lg text-[#070B00]">
                                            {" "}
                                            <a
                                                href="#testimonial"
                                                className={`hover:text-[#E68120] ${activeSection === "testimonial"
                                                    ? "text-[#E68120] "
                                                    : ""
                                                    }`}
                                            >
                                                Testimonial
                                            </a>
                                        </button>
                                        <button className="font-medium text-sm md:text-lg text-[#070B00]">
                                            {" "}
                                            <a
                                                href="/mainservice"
                                                className={`hover:text-[#E68120] ${activeSection === "gallery" ? "text-[#E68120] " : ""
                                                    }`}
                                            >
                                                Services
                                            </a>
                                        </button>
                                        <button className="font-medium text-sm md:text-lg text-[#070B00]">
                                            {" "}
                                            <a
                                                href="/maingallery"
                                                className={`hover:text-[#E68120] ${activeSection === "gallery" ? "text-[#E68120] " : ""
                                                    }`}
                                            >
                                                Gallery
                                            </a>
                                        </button>

                                    </div>
                                    <div className=" flex flex-col md:gap-5 gap-3">
                                        <div className=" items-center gap-3">
                                            <h3 className="text-[#000] font-semibold text-md mb-3">
                                                Address
                                            </h3>
                                            <p className="flex items-center max-w-[450px] gap-4 md:text-[15px] text-md mb-2 font-medium">
                                                SRA 156, Sreekanstewaram, Thakaraparambu Road,
                                                Thiruvananthapuram,
                                                <br /> Kerala 695023{" "}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-[#000] font-semibold text-md mb-3">
                                                Inquiries
                                            </h3>
                                            <p className="flex items-center  md:text-lg text-sm font-medium">
                                                <a href="tel:+91 7907913968">+91 7907913968</a>
                                            </p>
                                            <p className="flex items-center  md:text-lg text-sm font-medium">
                                                <a href="tel:+91 8921124851">+91 8921124851</a>
                                            </p>
                                            <p className="flex items-center md:text-lg text-sm font-medium">
                                                <a href="mailto: vkvdentalimplant@gmail.com">
                                                    {" "}
                                                    vkvdentalimplant@gmail.com
                                                </a>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="hidden lg:flex items-center gap-1 border-[1px] border-[#E68120]  text-[#000] px-6 py-2 rounded-[18px] text-[15px] font-medium hover:bg-[#0792CE] hover:text-[#fff] transition"
                                            >
                                                <a href="#Consultation" className="flex gap-1">Contact Us <MdArrowOutward className="text-xl" /></a>
                                            </button>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-[1px] border-[#0792CE] w-full"></div>
                <div className=" flex justify-center items-center py-4 ">
                    <p className="md:text-lg text-[12px] font-normal text-[#070B00]">
                        &copy; 2025 VKV Dental Clinic. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}