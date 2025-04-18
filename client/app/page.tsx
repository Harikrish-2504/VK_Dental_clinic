"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/Logo.png"
import { Menu, X } from "lucide-react";
import { MdArrowOutward } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiPhoneCall, FiPhone } from "react-icons/fi";
import heroimg from "../public/images/heroimg.png"
import consult from "../public/images/consult.png";
import stethoscope from "../public/images/stethoscope.png";
import rating from "../public/images/rating.png";
import equipment from "../public/images/equipment.png"
import { FaRegCalendarCheck, FaRegSquarePlus } from "react-icons/fa6";
import aboutus from "../public/images/aboutus.png"
import { IoArrowForwardCircle } from "react-icons/io5";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import galleryone from "../public/images/galleryone.png";
import gallerytwo from "../public/images/gallerytwo.png";
import gallerythree from "../public/images/gallerythree.png";
import galleryfour from "../public/images/galleryfour.png";
import galleryfive from "../public/images/galleryfive.png";
import testimonial from "../public/images/testimonial.png";
import consultation from "../public/images/consultation.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
  
        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { threshold: 0.6 }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    return () => observer.disconnect();
  }, []);
  


  return (
    <>
      <section className=" lg:block hidden bg-[#E68120]">
        <div className="container ">
          <div className="px-16  py-4 flex justify-between">
            <p className="text-[#fff] text-md font-medium flex items-center gap-1">
              <span><FiPhoneCall /></span>
              <a href=""></a>+91 7907913968
            </p>
            <div className="text-[#fff] text-md font-medium flex items-center gap-1">
              <span className="text-2xl"><MdOutlineLocationOn /></span>
              <p>Thiruvananthapuram, Kerala</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="w-full bg-white  relative z-50">
        {/* Loading Spinner */}
        <div className="max-w-7xl mx-auto lg:px-0 py-3 px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <Image src={logo} alt="Logo" width={150} height={50} />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-12 font-[500] text-md">
              <button

              >
                <a
                  href="/"
                  className={`hover:text-[#E68120] ${activeSection === "home" ? "text-[#E68120] border-b-2 border-[#0792CE]" : ""
                    }`}
                >
                  Home
                </a>
              </button>
              <button

              >
                <a
                  href="#about"
                  className={`hover:text-[#E68120] ${activeSection === "about" ? "text-[#E68120] border-b-2 border-[#0792CE]" : ""
                    }`}
                >About us</a>
              </button>
              <button

              >
                <a
                  href="#service"
                  className={`hover:text-[#E68120] ${activeSection === "service" ? "text-[#E68120] border-b-2 border-[#0792CE]" : ""
                    }`}
                >Services</a>
              </button>

              <button

              >
                <a
                  href="#testimonial"
                  className={`hover:text-[#E68120] ${activeSection === "testimonial" ? "text-[#E68120] border-b-2 border-[#0792CE]" : ""
                    }`}
                >Testimonial</a>
              </button>
            </div>

            {/* WhatsApp + Contact + Hamburger */}
            <div className="flex items-center gap-4">
              <button
                className="hidden lg:flex items-center gap-1 border-[1px] border-[#E68120]  text-[#000] px-6 py-2 rounded-[18px] text-[15px] font-medium hover:bg-[#0792CE] hover:text-[#fff] transition"
              >
                Contact Us <MdArrowOutward className="text-xl" />
              </button>

              {!isOpen && (
                <button onClick={() => setIsOpen(true)} className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="fixed inset-0  flex justify-end z-40" onClick={() => setIsOpen(false)}>
            <div className="w-[250px] h-full bg-white p-6 flex flex-col shadow-lg" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsOpen(false)} className="self-end mb-6">
                <X className="h-6 w-6 text-gray-700" />
              </button>
              <nav className="flex flex-col space-y-6">
                <button >
                  <a href="#home" className="hover:text-[#E68120]">Home</a>
                </button>
                <button >
                  <a href="#about" className="hover:text-[#E68120]">About Us</a>
                </button>
                <button >
                  <a href="#service" className="hover:text-[#E68120]">Services</a>
                </button>
                <button >
                  <a href="#testimonial" className="hover:text-[#E68120]">Testimonial</a>
                </button>
                <button className="border-[1px] border-[#E68120]  text-[#000] px-6 py-2 rounded-[15px] text-[15px] font-medium hover:bg-[#0792CE] hover:text-[#fff] transition">
                  Contact Us
                </button>
              </nav>
            </div>
          </div>
        )}
      </nav>
      <section className="bg-[#eff9ed]">
        <div className="container">
          <div className="flex  items-center justify-around md:flex-row flex-col ">
            <div className="flex flex-col gap-2 md:gap-4 lg:mt-0 mt-6">
              <h1 className="lg:text-7xl md:text-5xl text-4xl text-[#0792CE] font-semibold">Welcome To</h1>
              <h1 className="lg:text-7xl md:text-5xl text-4xl text-[#E68120] font-semibold mb-4 md:mb-6 ">Vkv Dental Clinic</h1>
              <p className="max-w-[590px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua ut enim ad minim veniam, quis nostrud.</p>
              <div className="flex md:justify-start justify-center">
                <button className="bg-[#E68120] text-[#fff] md:text-lg text-sm font-medium md:my-8 mt-4 md:py-4 py-2 md:max-w-[300px] max-w-[200px] px-4 rounded-2xl">
                  Request for Appointment
                </button>
              </div>
            </div>
            <div className="w-full max-w-[700px] ">
              <Image
                src={heroimg}
                alt="heroimg"
                width={700}
                height={400} // Adjust this height to match the aspect ratio of your image
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F5F5] py-20" >
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-items-center ">
            <div className="bg-[#fff] shadow-xl px-6 py-8 max-w-fit flex flex-col gap-3 rounded-2xl">
              <Image src={consult} width={85} height={85} alt="" />
              <h2 className="text-[#000] text-lg font-bold tracking-wide">Free  Consultation</h2>
              <p className="font-normal text-[#000] text-sm max-w-[260px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua ut enim ad minim veniam, quis nostrud.</p>
            </div>
            <div className="bg-[#fff] shadow-xl px-6 py-8 max-w-fit flex flex-col gap-3 rounded-2xl">
              <Image src={stethoscope} width={85} height={85} alt="" />
              <h2 className="text-[#000] text-lg font-bold tracking-wide">Expert  Dentist</h2>
              <p className="font-normal text-[#000] text-sm max-w-[260px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua ut enim ad minim veniam, quis nostrud.</p>
            </div>
            <div className="bg-[#fff] shadow-xl px-6 py-8 max-w-fit flex flex-col gap-3 rounded-2xl">
              <Image src={rating} width={85} height={85} alt="" />
              <h2 className="text-[#000] text-lg font-bold tracking-wide">Higher User Rating</h2>
              <p className="font-normal text-[#000] text-sm max-w-[260px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua ut enim ad minim veniam, quis nostrud.</p>
            </div>
            <div className="bg-[#fff] shadow-xl px-6 py-8 max-w-fit flex flex-col gap-3 rounded-2xl">
              <Image src={equipment} width={85} height={85} alt="" />
              <h2 className="text-[#000] text-lg font-bold tracking-wide">Best  Equipmnet</h2>
              <p className="font-normal text-[#000] text-sm max-w-[260px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua ut enim ad minim veniam, quis nostrud.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#0792CE] py-20">
        <div className="container">
          <div className="flex lg:flex-row flex-col justify-around items-center">
            <div className="text-[#fff]">
              <h1 className="font-semibold md:text-6xl text-2xl mb-4">How to get our service ?</h1>
              <p className="text-md md:text-lg lg:text-xl">just follow these simple steps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              <div className="bg-[#fff] text-[#52525B]  py-6 px-6 rounded-2xl flex flex-col justify-center items-center">
                <span className="text-3xl mb-4"><FiPhone /></span>
                <p className="text-center font-semibold text-sm">Request For<br /> Appointment</p>
              </div>
              <div className="bg-[#fff] text-[#52525B]  py-6 px-6 rounded-2xl flex flex-col justify-center items-center">
                <span className="text-3xl mb-4"><FaRegCalendarCheck /></span>
                <p className="text-center font-semibold text-sm">Get a<br /> Date&serial</p>
              </div>
              <div className="bg-[#fff] text-[#52525B]  py-6 px-6 rounded-2xl flex flex-col justify-center items-center">
                <span className="text-3xl mb-4"><FaRegSquarePlus /></span>
                <p className="text-center font-semibold text-sm">Consult<br /> your dentist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eff9eb] py-20" id="about">
        <div className="container">
          <div className="">
            <h1 className="text-[#595858] lg:text-4xl md:text-2xl text-xl font-semibold mb-5 md:mb-15">About Us</h1>
          </div>
          <div className="flex flex-col lg:flex-row  gap-15 items-center justify-center">
            <Image src={aboutus} width={450} height={50} alt="aboutus" />
            <p className="max-w-[640px] tracking-wide font-medium text-xl leading-9">
              We understand the impact that your oral health can have on the well-being of your entire body. Diseases of the mouth have been linked
              to serious conditions like diabetes and high blood pressure. Drs. Patel, Conkey, and Moberger are dedicated to helping you maintain
              optimal oral health to keep you healthy and happy as you possibly can be.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F5F5] py-20" id="service">
        <div className="container">
          <div className="">
            <p className="text-lg text-[#89DB7B] font-semibold mb-3">Satisfy Solution</p>
            <h2 className="text-3xl font-semibold tracking-wide leading-6">The Best Dental Treatment</h2>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:py-10 py-5 gap-4">
            <div className="bg-[#fff] shadow-xl p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-lg md:text-xl tracking-wide">Painless Injection</h1>
                <span className="text-[#0792CE] md:text-4xl text-2xl"><IoArrowForwardCircle /></span>
              </div>
              <p className="max-w-[260px] tracking-wide font-normal text-md">We understand    theimpact that your oral health can have on the well-being of your entire body.
                Diseases of the mouth have been linked to serious conditions like diabetes and high blood </p>
            </div>
            <div className="bg-[#fff] shadow-xl p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-lg md:text-xl tracking-wide">Laser Technology</h1>
                <span className="text-[#0792CE] md:text-4xl text-2xl"><IoArrowForwardCircle /></span>
              </div>
              <p className="max-w-[260px] tracking-wide font-normal text-md">We understand    theimpact that your oral health can have on the well-being of your entire body.
                Diseases of the mouth have been linked to serious conditions like diabetes and high blood </p>
            </div>
            <div className="bg-[#fff] shadow-xl p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-lg md:text-xl tracking-wide">Dental Implant</h1>
                <span className="text-[#0792CE] md:text-4xl text-2xl"><IoArrowForwardCircle /></span>
              </div>
              <p className="max-w-[260px] tracking-wide font-normal text-md">We understand    theimpact that your oral health can have on the well-being of your entire body.
                Diseases of the mouth have been linked to serious conditions like diabetes and high blood </p>
            </div>
            <div className="bg-[#fff] shadow-xl p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-lg md:text-xl tracking-wide">Painless Injection</h1>
                <span className="text-[#0792CE] md:text-4xl text-2xl"><IoArrowForwardCircle /></span>
              </div>
              <p className="max-w-[260px] tracking-wide font-normal text-md">We understand    theimpact that your oral health can have on the well-being of your entire body.
                Diseases of the mouth have been linked to serious conditions like diabetes and high blood </p>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <span className="text-4xl"><BsArrowLeftCircle /></span>
            <span className="text-4xl"><BsArrowRightCircle /></span>
          </div>
        </div>
      </section>
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
      <section className="py-20" id="testimonial">
        <div className="container">
          <div className="text-center mb-15">
            <h4 className="text-md font-medium mb-3">Testimonials</h4>
            <h1 className="text-3xl font-semibold">What People Say About Us</h1>
          </div>

          <div className="flex items-center justify-between max-w-6xl mx-auto my-10 px-4">
            {/* Left Arrow */}
            <span className="text-4xl cursor-pointer text-gray-600 hover:text-black transition">
              <BsArrowLeftCircle />
            </span>

            {/* Testimonial Content */}
            <div className="flex flex-col justify-center items-center gap-10 text-center">
              <Image src={testimonial} width={150} height={50} alt="testimonial" />
              <p className="max-w-[650px] font-[500] text-lg text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud.
              </p>
              <div>
                <h2 className="font-semibold text-lg">David Gahan</h2>
                <h3 className="text-md">Detroit, Michigan</h3>
              </div>
            </div>

            {/* Right Arrow */}
            <span className="text-4xl cursor-pointer text-gray-600 hover:text-black transition">
              <BsArrowRightCircle />
            </span>
          </div>
        </div>
      </section>
      <section className="bg-[#eff9eb] py-20 ">
        <div className="container">
          <div className="flex justify-center items-center ">
            <Image src={consultation} width={450} height={50} alt="" className="shadow-xl/20 rounded-l-[50px]" />
            <div className="bg-[#fff] py-24 px-10 rounded-r-[50px] shadow-xl/20">
              <h1 className="font-semibold text-2xl mb-8 text-center">Get a Consultation</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Fullname*" className="py-3 border-[1px] border-[#D1D1D1] rounded-xl text-sm pl-2 " />
                <input type="text" placeholder="I’m interested in*" className="py-3 border-[1px] border-[#D1D1D1]  rounded-xl text-sm pl-2" />


                <input type="text" placeholder="Email*" className="py-3 border-[1px] border-[#D1D1D1]  rounded-xl text-sm pl-2" />
                <input type="text" placeholder="Number" className="py-3 border-[1px] border-[#D1D1D1]  rounded-xl text-sm pl-2" />
              </div>
              <div className=" flex justify-center items-center  bg-[#E68120] mt-8 text-center rounded-3xl">
                <button className="flex justify-center items-center  text-[#1E1E1E] font-medium text-lg py-4 ">
                  Submit<MdArrowOutward className="text-2xl ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#eff9eb] ">
        <div className="border border-[#0792CE] w-full"></div>
        <div className="container">
          <div className="relative w-full   "
            style={{
              backgroundImage: "url(/project-bg.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >

            <div className="container">

              <div className="md:py-20 py-10 px-6">

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:place-items-start items-center  gap-15">
                  <div className=" flex flex-col items-center gap-10">
                    <Image src={logo} alt="Logo" width={250} height={50} className=" transform transition-transform duration-300 hover:scale-105 " />
                    <div className="">
                      <p className="text-[#070B00] md:text-md text-sm font-semibold text-center mb-3 ">Follow Us</p>
                      <div className="flex  md:gap-3 gap-2">
                        <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                          <FaFacebook className="md:text-2xl text-lg" />
                        </a>
                        <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                          <FaTwitter className="md:text-2xl text-lg" />
                        </a>
                        <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                          <FaInstagram className="md:text-2xl text-lg" />
                        </a>
                      </div>

                    </div>
                  </div>
                  <div className="flex flex-col md:gap-4 gap-2 items-start ">

                    <button className="font-medium text-sm md:text-lg text-[#070B00]"> <a
                      href="/"
                      className={`hover:text-[#E68120] ${activeSection === "home" ? "text-[#E68120] " : ""
                        }`}
                    >
                      Home
                    </a></button>
                    <button className="font-medium text-sm md:text-lg text-[#070B00]">   <a
                      href="#service"
                      className={`hover:text-[#E68120] ${activeSection === "service" ? "text-[#E68120] " : ""
                        }`}
                    >Services</a>
                    </button>
                    <button className="font-medium text-sm md:text-lg text-[#070B00]"> <a
                      href="#about"
                      className={`hover:text-[#E68120] ${activeSection === "about" ? "text-[#E68120] " : ""
                        }`}
                    >About Us</a>
                    </button>
                    <button className="font-medium text-sm md:text-lg text-[#070B00]"> <a
                      href="#testimonial"
                      className={`hover:text-[#E68120] ${activeSection === "testimonial" ? "text-[#E68120] " : ""
                        }`}
                    >Testimonial</a>
                    </button>
                    <button className="font-medium text-sm md:text-lg text-[#070B00]"> <a
                      href="/gallery"
                      className={`hover:text-[#E68120] ${activeSection === "gallery" ? "text-[#E68120] " : ""
                        }`}
                    >Services</a>
                    </button>
                    <button className="font-medium text-sm md:text-lg text-[#070B00]"> <a
                      href="contactus"
                      className={`hover:text-[#E68120] ${activeSection === "contactus" ? "text-[#E68120] " : ""
                        }`}
                    >Contact Us</a>
                    </button>

                  </div>
                  <div className=" flex flex-col md:gap-5 gap-3">

                    <div className=" items-center gap-3">
                      <h3 className="text-[#000] font-semibold text-md mb-3">Address</h3>
                      <p className="flex items-center max-w-[320px] gap-4 md:text-[15px] text-md mb-2 font-medium">
                        SRA 156,Nalumukku, Sreekanstwaram, Pazhavangadi, Thiruvananthapuram,<br /> Kerala 695023  </p>

                    </div>

                    <div>
                      <h3 className="text-[#000] font-semibold text-md mb-3">Inquiries</h3>
                      <p className="flex items-center  md:text-lg text-sm font-medium"><a href="tel:+91 7907913968">+91 7907913968</a></p>
                      <p className="flex items-center md:text-lg text-sm font-medium" ><a href="mailto: vkvdentalimplant@gmail.com"> vkvdentalimplant@gmail.com</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[1px] border-[#0792CE] w-full"></div>
        <div className=" flex justify-center items-center py-4 ">
          <p className="md:text-lg text-[12px] font-normal text-[#070B00]">&copy; 2025 VKV Dental Clinic. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
