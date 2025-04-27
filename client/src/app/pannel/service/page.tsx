"use client"
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function Service() {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddClick = () => setShowForm(true);
    const handleCloseClick = () => setShowForm(false); // Close the form

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Title:", title);
        console.log("Description:", description);
        // Add your save logic here
        setTitle("");
        setDescription("");
        setShowForm(false); // Close the form after submission
    };

    return (
        <div className="lg:ml-60 px-4 relative">
            <div className="flex justify-end lg:my-6 ">
                <button
                    className="bg-[#44BBEE] text-white font-medium md:text-lg text-sm  py-3 md:px-7 px-4 rounded-xl"
                    onClick={handleAddClick}
                >
                    ADD
                </button>
            </div>

            {/* Form to add a new service */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="mb-8 bg-white p-6 rounded-2xl shadow-lg  z-10 absolute lg:top-28 lg:left-72 left-0 md:top-20 top-4 md:left-28 w-full max-w-md mx-auto"
                >
                    {/* Close button */}
                    <button
                        type="button"
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        onClick={handleCloseClick}
                    >
                        <span className="text-2xl"><IoMdClose /></span>
                    </button>

                    <div className="mb-4">
                        <label className="block mb-1 text-[#ce7b00] font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-[#ce7b00] font-medium">Description</label>
                        <textarea
                            className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#18a000] text-white px-6 py-2 rounded-md "
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}


            {/* Grid displaying services */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:py-10 py-5 gap-8">
                <div className="bg-[#fff] shadow-xl py-8 px-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="font-medium text-lg md:text-2xl tracking-wide">Teeth Clining</h1>
                        <span className="text-[#FA0C0C] md:text-2xl text-xl"><MdDelete /></span>
                    </div>
                    <p className="max-w-[480px] tracking-wide font-normal text-sm">We understand the impact that your oral health can have on the well-being of your entire body. Diseases of the mouth have been linked to serious conditions like diabetes and high blood pressure.</p>
                </div>
                <div className="bg-[#fff] shadow-xl py-8 px-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="font-medium text-lg md:text-2xl tracking-wide">Teeth Clining</h1>
                        <span className="text-[#FA0C0C] md:text-2xl text-xl"><MdDelete /></span>
                    </div>
                    <p className="max-w-[480px] tracking-wide font-normal text-sm">We understand the impact that your oral health can have on the well-being of your entire body. Diseases of the mouth have been linked to serious conditions like diabetes and high blood pressure.</p>
                </div>
                <div className="bg-[#fff] shadow-xl py-8 px-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="font-medium text-lg md:text-2xl tracking-wide">Teeth Clining</h1>
                        <span className="text-[#FA0C0C] md:text-2xl text-xl"><MdDelete /></span>
                    </div>
                    <p className="max-w-[480px] tracking-wide font-normal text-sm">We understand the impact that your oral health can have on the well-being of your entire body. Diseases of the mouth have been linked to serious conditions like diabetes and high blood pressure.</p>
                </div>
                <div className="bg-[#fff] shadow-xl py-8 px-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="font-medium text-lg md:text-2xl tracking-wide">Teeth Clining</h1>
                        <span className="text-[#FA0C0C] md:text-2xl text-xl"><MdDelete /></span>
                    </div>
                    <p className="max-w-[480px] tracking-wide font-normal text-sm">We understand the impact that your oral health can have on the well-being of your entire body. Diseases of the mouth have been linked to serious conditions like diabetes and high blood pressure.</p>
                </div>
                <div className="bg-[#fff] shadow-xl py-8 px-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="font-medium text-lg md:text-2xl tracking-wide">Teeth Clining</h1>
                        <span className="text-[#FA0C0C] md:text-2xl text-xl"><MdDelete /></span>
                    </div>
                    <p className="max-w-[480px] tracking-wide font-normal text-sm">We understand the impact that your oral health can have on the well-being of your entire body. Diseases of the mouth have been linked to serious conditions like diabetes and high blood pressure.</p>
                </div>
            </div>
        </div>
    );
}
