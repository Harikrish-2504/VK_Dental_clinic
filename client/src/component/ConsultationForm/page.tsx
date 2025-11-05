"use client";

import { useState ,useEffect} from "react";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import consultation from "../../../public/images/consultation.png"; // adjust path if needed
import { apiClient } from "@/src/utlis/apiClinet";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ConsultationForm() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });

    

    
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



  const [form, setForm] = useState({
    name: "",
    details: "",
    email: "",
    number: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiClient(
        "/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            number: form.number,
            details: form.details,
          }),
        },
        false // no token needed
      );

      if (res.success) {
        toast.success("Consultation request sent successfully!");
        setForm({ name: "", email: "", number: "", details: "" });
      } else {
        alert(res.message || "❌ Failed to send message. Please try again.");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error?.message);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#eff9eb] py-20" id="Consultation" data-aos="fade-up">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex md:flex-row flex-col justify-center items-center"
        >
          <Image
            src={consultation}
            width={455}
            height={50}
            alt="Consultation"
            className="shadow-xl/20 rounded-l-[50px] lg:block hidden"
          />
          <div className="bg-[#fff] md:py-24 py-14 px-10 lg:rounded-r-[50px] shadow-xl/20 lg:rounded-none rounded-2xl">
            <h1 className="font-semibold text-2xl mb-8 text-center">
              Get a Consultation
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Fullname*"
                required
                className="py-3 border border-[#D1D1D1] rounded-xl text-sm pl-2"
              />
              <input
                type="text"
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Consult For*"
                required
                className="py-3 border border-[#D1D1D1] rounded-xl text-sm pl-2"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email*"
                required
                className="py-3 border border-[#D1D1D1] rounded-xl text-sm pl-2"
              />
              <input
                type="text"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="Number"
                required
                className="py-3 border border-[#D1D1D1] rounded-xl text-sm pl-2"
              />
            </div>

            <div className="flex justify-center items-center bg-[#E68120] mt-8 text-center rounded-3xl">
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center text-[#1E1E1E] font-medium text-lg py-4"
              >
                {loading ? "Sending..." : "Submit"}
                {!loading && <MdArrowOutward className="text-2xl ml-2" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
