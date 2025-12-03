"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { MdArrowOutward } from "react-icons/md"
import { usePathname, useRouter } from 'next/navigation';

export default function mainNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash;
            if (hash) {
                // Wait a moment so the page loads before scrolling
                setTimeout(() => {
                    const section = document.querySelector(hash);
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                    }
                }, 500);
            }
        }
    }, [pathname]);


    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                } else {
                    // If no section is intersecting, set the active section to "home"
                    setActiveSection("home");
                }
            },
            { threshold: 0.6 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        // Listen for route changes
        const routeChangeStart = () => handleStart();
        const routeChangeComplete = () => handleComplete();

        // Watch for path changes by using pathname directly
        if (pathname) {
            setLoading(false);
        }

        // Cleanup function
        return () => {
            setLoading(false); // Cleanup loading on component unmount
        };
    }, [pathname]);


    return (
        <>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-[9999]">
                    <div className="relative w-16 h-16 rounded-full bg-[#E68120] animate-spin flex items-center justify-center">
                        <div className="absolute top-0 w-4 h-4 rounded-full bg-white"></div> {/* moved top */}
                    </div>
                </div>
            )}

            <nav className="w-full bg-white  relative z-50">
                {/* Loading Spinner */}
                <div className="max-w-7xl mx-auto lg:px-0 py-3 px-6">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/">
                            <Image src="/images/Logo.png" alt="Logo" width={180} height={50} className="w-34 lg:w-40 object-cover" />
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex space-x-12 font-[500] text-md">
                            <button

                            >
                                <a
                                    href="/" onClick={() => setLoading(true)}
                                    className={`hover:text-[#E68120] ${(pathname === "/" && activeSection === "home") ? "text-[#E68120] border-b-2 border-[#0792CE]" : ""
                                        }`}
                                >
                                    Home
                                </a>
                            </button>
                            <button

                            >
                                <a
                                    href="/#about"
                                    className="text-[#000] hover:text-[#E68120] "

                                >About us</a>
                            </button>
                            <button

                            >
                                <a
                                    href="/mainservice" onClick={() => setLoading(true)}
                                    className={`hover:text-[#E68120] ${pathname === "/mainservice" ? "text-[#E68120] border-b-2 border-[#0792CE]" : ""
                                        }`}
                                >Services</a>
                            </button>
                            <button

                            >
                                <a
                                    href="/maingallery" onClick={() => setLoading(true)}
                                    className={`hover:text-[#E68120] ${pathname === "/maingallery" ? "text-[#E68120] border-b-2 border-[#0792CE]" : ""
                                        }`}
                                >Gallery</a>
                            </button>
                            <button

                            >
                                <a
                                    href="/#testimonial"
                                    className="text-[#000] hover:text-[#E68120]"
                                >Testimonial</a>
                            </button>
                        </div>

                        {/* WhatsApp + Contact + Hamburger */}
                        <div className="flex items-center gap-4">
                            <button
                                className="hidden lg:flex items-center gap-1 border-[1px] border-[#E68120]  text-[#000] px-6 py-2 rounded-[18px] text-[15px] font-medium hover:bg-[#0792CE] hover:text-[#fff] transition"
                            >
                                <a href="#Consultation" className="flex gap-1">Contact Us <MdArrowOutward className="text-xl" /></a>
                            </button>

                            {!isOpen && (
                                <button onClick={() => setIsOpen(true)} className="lg:hidden">
                                    <Menu className="h-7 w-7 text-[#E68120]" />
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
                                <X className="h-6 w-6 text-[#E68120]" />
                            </button>
                            <nav className="flex flex-col space-y-6">
                                <button >
                                    <a href="/" className="hover:text-[#E68120]" onClick={() => setIsOpen(false)}>Home</a>
                                </button>
                                <button>
                                    <Link
                                        href="/#about"
                                        onClick={() => {
                                            setIsOpen(false);
                                            router.push("/#about");
                                        }}
                                        className="hover:text-[#E68120]"
                                    >
                                        About Us
                                    </Link>
                                </button>
                                <button >
                                    <a href="/mainservice" className="hover:text-[#E68120]" onClick={() => setIsOpen(false)}>Services</a>
                                </button>
                                <button >
                                    <a href="/maingallery" className="hover:text-[#E68120]" onClick={() => setIsOpen(false)}>Gallery</a>
                                </button>
                                <button>
                                    <Link
                                        href="/#testimonial"
                                        onClick={() => {
                                            setIsOpen(false);
                                            router.push("/#testimonial");
                                        }}
                                        className="hover:text-[#E68120]"
                                    >
                                        Testimonial
                                    </Link>
                                </button>
                                <button className="border-[1px] border-[#E68120] text-[#000] px-6 py-2 rounded-[15px] text-[15px] font-medium hover:bg-[#0792CE] hover:text-[#fff] transition">
                                    <Link
                                        href="/#Consultation"
                                        onClick={() => {
                                            setIsOpen(false);
                                            router.push("/#Consultation");
                                        }}
                                    >
                                        Contact Us
                                    </Link>
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}