"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiPhoneCall, FiPhone } from "react-icons/fi";
import heroimg from "../../public/images/heroimg.png";
import { FaRegCalendarCheck, FaRegSquarePlus } from "react-icons/fa6";
import aboutus from "../../public/images/aboutus.jpg";
import abouts from "../../public/images/abouts.jpg";
import MainNavbar from "../component/mainNavbar/page";
import InitialLoader from "../component/initialloader/page";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosArrowDown } from "react-icons/io";
import GallerySection from "../component/Gallery/page";
import Services from "../component/Services/page";
import ConsultationForm from "../component/ConsultationForm/page";
import Footer from "../component/Footer/page";
import { FaWhatsapp } from "react-icons/fa";
import { TestimonialSection } from "../component/Testimonials/page";
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [showHours, setShowHours] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [index, setIndex] = useState(0);
  const callRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const testimonials = [
    {
      img: "/images/testimonial.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "David Gahan",
      location: "Detroit, Michigan",
    },
    {
      img: "/images/testimonial.png",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      name: "Sarah Johnson",
      location: "Los Angeles, California",
    },
    {
      img: "/images/testimonial.png",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      name: "Michael Smith",
      location: "New York, USA",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        callRef.current &&
        !callRef.current.contains(event.target as Node) &&
        hoursRef.current &&
        !hoursRef.current.contains(event.target as Node)
      ) {
        setShowCallPopup(false);
        setShowHours(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  const [initialLoading, setInitialLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("initialLoaded");

    if (!hasLoaded) {
      setInitialLoading(true);
      const timer = setTimeout(() => {
        setInitialLoading(false);
        sessionStorage.setItem("initialLoaded", "true");
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setInitialLoading(false); // Skip loader if already loaded
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });

    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // ✅ allow repeating
      easing: "ease-in-out",
    });

    // 👇 Important: refresh on scroll ensures it keeps detecting
    const handleScroll = () => AOS.refresh();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return initialLoading ? (
    <InitialLoader />
  ) : (
    <>
      <section className=" lg:block hidden bg-[#E68120]">
        <div className="container ">
          <div className="px-16  py-4 flex justify-between">
            <p className="text-[#fff] text-md font-medium flex items-center gap-1">
              <span>
                <FiPhoneCall />
              </span>
              <a href=""></a>+91 7907913968, +91 89211 24851
            </p>
            <div className="text-[#fff] text-md font-medium flex items-center gap-1">
              <span className="text-2xl">
                <MdOutlineLocationOn />
              </span>
              <p>Thiruvananthapuram, Kerala</p>
            </div>
          </div>
        </div>
      </section>
      <MainNavbar />

      <section className="bg-[#eff9ed]">
        <div className="container">
          <div className="flex  items-center justify-around md:flex-row flex-col ">
            <div className="flex flex-col gap-2 md:gap-4 lg:mt-0 mt-6">
              <h1 className="lg:text-7xl md:text-5xl text-4xl text-[#0792CE] font-semibold">
                Welcome To
              </h1>
              <h1 className="lg:text-7xl md:text-5xl text-4xl  text-[#E68120] font-semibold mb-4 md:mb-6 ">
                Vkv Dental Clinic
              </h1>
              <p className="max-w-[700px] text-sm lg:text-[16px] lg:text-start text-justify">
                VKV Dental Clinic & Implant Center is a multi-specialty dental
                clinic ested in 2019, located in Thiruvananthapuram. Our clinic
                is equipped with state of the art facilities and advanced dental
                equipment designed to deliver high quality care in a comfortable
                environment. Our team comprises highly trained dental
                professionals and skilled assistants who are committed to
                providing premium dental treatment with a focus on patient
                comfort, safety, and satisfaction.
              </p>
              <div className="flex md:justify-start justify-center">
                <button className="bg-[#E68120] text-[#fff] md:text-lg text-sm font-medium md:my-8 mt-4 md:py-4 py-2 md:max-w-[300px] max-w-[200px] px-4 rounded-2xl">
                  Request for Appointment
                </button>
              </div>
            </div>
            <div className="w-full max-w-[700px] " data-aos="fade-up">
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

      <Services />
      <section className="bg-[#0792CE] py-20">
        <div className="container">
          <div className="flex lg:flex-row flex-col justify-around items-center">
            <div className="text-[#fff] lg:mb-0 mb-5 text-center">
              <h1 className="font-semibold lg:text-6xl md:text-4xl text-2xl mb-4">
                How to get our service ?
              </h1>
              <p className="text-md md:text-lg lg:text-xl md:text-start">
                just follow these simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-8 md:gap-12 gap-8">
              {/* Step 1 - Appointment */}
              <div ref={callRef} className="relative" data-aos="fade-up">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCallPopup(!showCallPopup);
                    setShowHours(false);
                  }}
                  className="cursor-pointer bg-white text-[#52525B] py-6 px-6 rounded-2xl flex flex-col justify-center items-center hover:shadow-lg transition duration-300"
                >
                  <span className="text-3xl mb-4 text-[#000]">
                    <FiPhone />
                  </span>
                  <p className="text-center font-semibold text-sm flex justify-center items-center text-[#000]">
                    Request For
                    <br />
                    Appointment
                    <IoIosArrowDown className="text-lg ml-1" />
                  </p>
                </div>

                {showCallPopup && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute z-50 top-full mt-3 left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-sm text-gray-700"
                  >
                    <p className="text-center mb-2 text-[#000]">
                      Call us to book your appointment
                    </p>
                    <p className="text-center font-semibold text-[#0792CE] mb-3">
                      +91 7907913968, +91 8921124851
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="block text-center bg-[#0792CE] text-white py-2 rounded-md font-semibold hover:bg-[#0578ac] transition"
                    >
                      Call Now
                    </a>
                  </div>
                )}
              </div>

              {/* Step 2 - Hours */}
              <div ref={hoursRef} className="relative" data-aos="fade-up">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHours(!showHours);
                    setShowCallPopup(false);
                  }}
                  className="cursor-pointer bg-white text-[#52525B] py-6 px-6 rounded-2xl flex flex-col justify-center items-center transition duration-300 hover:shadow-lg"
                >
                  <span className="text-3xl mb-4 text-[#000]">
                    <FaRegCalendarCheck />
                  </span>
                  <p className="text-center font-semibold text-sm flex justify-center items-center text-[#000]">
                    Consult <br />
                    Days & Time <IoIosArrowDown className="text-lg ml-1" />
                  </p>
                </div>

                {showHours && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute z-50 top-full mt-3 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-700"
                  >
                    <h4 className="font-bold mb-2 text-center text-[#0792CE]">
                      Opening Hours
                    </h4>
                    <div className="flex justify-between">
                      <span>Mon – Sat:</span>
                      <div className="text-right">
                        <p>10:00am – 2:00pm</p>
                        <p>4:30pm – 9:00pm</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 border-t pt-2">
                      <span>Sunday:</span>
                      <span className="text-red-500 font-semibold">
                        Holiday
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3 */}
              <div
                data-aos="fade-up"
                className=" bg-white text-[#52525B] py-6 px-6 rounded-2xl flex flex-col justify-center items-center"
              >
                <span className="text-3xl mb-4 text-[#000]">
                  <FaRegSquarePlus />
                </span>
                <p className="text-center font-semibold text-sm text-[#000]">
                  Consult
                  <br />
                  your dentist
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eff9eb] py-20" id="about">
        <div className="container">
          <div className="">
            <h1 className="text-[#000] lg:text-4xl md:text-2xl text-xl font-semibold mb-5 md:mb-15">
              About Us
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row  gap-15 items-center justify-center">
            <div className="relative">
              <Image
                src={aboutus}
                width={450}
                height={50}
                alt="aboutus"
                className="rounded-tl-[50px] rounded-br-2xl"
              />
              <div className="lg:block hidden absolute  -right-5 -bottom-5">
                <Image
                  src={abouts}
                  width={200}
                  height={50}
                  alt="aboutus"
                  className="object-cover rounded-full w-40 h-40"
                />
              </div>
            </div>
            <div data-aos="fade-up">
              <div className="max-w-[640px] lg:tracking-wide font-medium  md:text-lg text-md md:leading-8 leading-6">
                <p className="text-[#000] md:text-lg text-sm">
                  VKV Dental Clinic & Implant Center is a multi-specialty dental
                  clinic ested in 2019, located in Thiruvananthapuram. Our
                  clinic is equipped with state of the art facilities and
                  advanced dental equipment designed to deliver high quality
                  care in a comfortable environment. Our team comprises highly
                  trained dental professionals and skilled assistants who are
                  committed to providing premium dental treatment with a focus
                  on patient comfort, safety, and satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GallerySection />

      <TestimonialSection />

      <ConsultationForm />
      <Footer />
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+918921124851" // add country code if needed e.g. 917878787878
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>
    </>
  );
}
