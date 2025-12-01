
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { apiClient } from "@/src/utlis/apiClinet";

export default function Gallery() {
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  // Fetch gallery images on mount
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("⚠️ Please select an image before uploading.");
      return;
    }

    // ✅ 1. Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ You must be logged in to upload an image.");
      return;
    }

    // ✅ 2. Prepare FormData
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // ✅ 3. Use BASE_URL from env
      const res = await fetch(`${process.env.BASE_URL}/gallery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ dynamic token
        },
        body: formData, // ✅ FormData handles content-type automatically
      });

      // ✅ 4. Parse response
      const data = await res.json();

      if (res.ok) {
        alert("✅ Image uploaded successfully!");
        setShowForm(false);
        setImageFile(null);
        fetchGalleryImages();
      } else {
        alert(`❌ ${data.message || "Upload failed"}`);
      }
    } catch (err) {
      console.error("❌ Error uploading:", err);
      alert("⚠️ Server error — please try again later.");
    }
  };

  return (
    <div className="lg:ml-60 px-4 relative">
      {/* ADD Button */}
      <div className="flex justify-end lg:my-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#44BBEE] text-white font-medium md:text-lg text-sm py-3 md:px-7 px-4 rounded-xl"
        >
          ADD
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-2xl shadow-lg z-10 absolute lg:top-28 lg:left-72 left-0 md:top-20 top-4 md:left-28 w-full max-w-md mx-auto"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setShowForm(false)}
          >
            <span className="text-2xl">
              <IoMdClose />
            </span>
          </button>

          <div className="mb-4">
            <label className="block mb-1 text-[#ce7b00] font-medium">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
            />
          </div>

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

      {/* Gallery Images */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center place-content-center pt-3">
        {galleryImages.map((item, index) => (
          <div
            key={item._id || index}
            className="lg:w-[370px] w-[350px] lg:h-[340px] h-[290px] overflow-hidden"
          >
            {/* <img
              src={item.image.url}
              alt={`gallery-${index}`}
              className="w-full h-full object-cover rounded-xl shadow"
            /> */}
            <Image
              src={item.image.url}
              alt="gallery"
              width={370}
              height={340}
              className="w-full h-full object-cover rounded-xl shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
