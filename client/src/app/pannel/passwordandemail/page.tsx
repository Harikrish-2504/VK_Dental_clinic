"use client";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import logo from "../../../../public/images/Logo.png";
import Image from "next/image";
export default function PasswordAndEmail() {
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [email, setEmail] = useState(""); // State to store new email
    const [password, setPassword] = useState(""); // State to store new password

    const handleChangeClick = () => {
        setShowForm(true); // Show form when button is clicked
    };

    const handleCloseClick = () => {
        setShowForm(false); // Close form
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated Email:", email);
        console.log("Updated Password:", password);
        // Add your form submission logic here
        setEmail("");
        setPassword("");
        setShowForm(false); // Close form after submission
    };

    return (
        <div className="lg:ml-60 px-4 relative">
            <div className="flex justify-end my-6">
                <button
                    className="bg-[#44BBEE] text-white font-medium lg:text-lg text-sm py-3 px-7 rounded-xl"
                    onClick={handleChangeClick}
                >
                    Change Password & Email
                </button>
            </div>
            {/* Button to open the form */}
            <div className="  px-4 h-[calc(100vh-300px)] flex flex-col  justify-center items-center gap-5">
                
                <h1 className="text-4xl font-semibold text-[#E68120]">Dr.abcdefg hijk</h1>
                <p className="text-2xl font-medium text-[#44BBEE]">VKV Dental Clinic</p>

            </div>

            {/* Form to change email and password */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-4  py-10 px-12 rounded-2xl bg-white  shadow-lg absolute lg:top-40 lg:left-72 md:left-24 top-2 left-0 lg:w-1/2 md:w-3/4 w-full flex flex-col gap-3" // Add relative here
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={handleCloseClick}
                        className="absolute top-2 right-2 text-gray-500"
                    >
                        <span className="text-2xl">
                            <IoMdClose />
                        </span>
                    </button>

                    {/* Email input */}
                    <div className="mb-4">
                        <label className="block mb-1 text-[#ce7b00] font-medium">Name</label>
                        <input
                            type="name"
                            className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter new name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-[#ce7b00] font-medium">Serivce</label>
                        <input
                            type="service"
                            className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter new service"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-[#ce7b00] font-medium">New Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter new email"
                            required
                        />
                    </div>


                    {/* Password input */}
                    <div className="mb-4">
                        <label className="block mb-1 text-[#ce7b00] font-medium">New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new Password"
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#18a000] text-white px-6 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
