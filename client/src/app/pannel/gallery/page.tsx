// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { IoMdClose } from "react-icons/io";
// import { apiClient } from "@/src/utlis/apiClinet";

// export default function Gallery() {
//   const [showForm, setShowForm] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [galleryImages, setGalleryImages] = useState<any[]>([]);

//   // Fetch gallery images on mount
//   const fetchGalleryImages = async () => {
//     try {
//       const res = await apiClient("/gallery");
//       if (res.success) {
//         setGalleryImages(res.data);
//       } else {
//         console.error("Failed to load gallery");
//       }
//     } catch (err) {
//       console.error("Error fetching gallery:", err);
//     }
//   };
//   useEffect(() => {
//     fetchGalleryImages();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile) {
//       alert("⚠️ Please select an image before uploading.");
//       return;
//     }

//     // ✅ 1. Get token from localStorage
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("⚠️ You must be logged in to upload an image.");
//       return;
//     }

//     // ✅ 2. Prepare FormData
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     try {
//       // ✅ 3. Use BASE_URL from env
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ dynamic token
//         },
//         body: formData, // ✅ FormData handles content-type automatically
//       });

//       // ✅ 4. Parse response
//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Image uploaded successfully!");
//         setShowForm(false);
//         setImageFile(null);
//         fetchGalleryImages();
//       } else {
//         alert(`❌ ${data.message || "Upload failed"}`);
//       }
//     } catch (err) {
//       console.error("❌ Error uploading:", err);
//       alert("⚠️ Server error — please try again later.");
//     }
//   };

//   return (
//     <div className="lg:ml-60 px-4 relative">
//       {/* ADD Button */}
//       <div className="flex justify-end lg:my-6">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#44BBEE] text-white font-medium md:text-lg text-sm py-3 md:px-7 px-4 rounded-xl"
//         >
//           ADD
//         </button>
//       </div>

//       {/* Upload Form */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="mb-8 bg-white p-6 rounded-2xl shadow-lg z-10 absolute lg:top-28 lg:left-72 left-0 md:top-20 top-4 md:left-28 w-full max-w-md mx-auto"
//         >
//           <button
//             type="button"
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//             onClick={() => setShowForm(false)}
//           >
//             <span className="text-2xl">
//               <IoMdClose />
//             </span>
//           </button>

//           <div className="mb-4">
//             <label className="block mb-1 text-[#ce7b00] font-medium">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
//               onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//               required
//             />
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-[#18a000] text-white px-6 py-2 rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Gallery Images */}
//       <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center place-content-center pt-3">
//         {galleryImages.map((item, index) => (
//           <div
//             key={item._id || index}
//             className="lg:w-[370px] w-[350px] lg:h-[340px] h-[290px] overflow-hidden"
//           >
//             {/* <img
//               src={item.image.url}
//               alt={`gallery-${index}`}
//               className="w-full h-full object-cover rounded-xl shadow"
//             /> */}
//             <Image
//               src={item.image.url}
//               alt="gallery"
//               width={370}
//               height={340}
//               className="w-full h-full object-cover rounded-xl shadow"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { apiClient } from "@/src/utlis/apiClinet";

type GalleryItem = {
  _id: string;
  image: {
    url: string;
    path?: string;
  };
};

export default function Gallery() {
  const [showForm, setShowForm] = useState(false);

  // multiple files
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch gallery images on mount
  const fetchGalleryImages = async () => {
    try {
      setLoadingGallery(true);
      const res = await apiClient("/gallery");
      if (res.success) {
        setGalleryImages(res.data);
      } else {
        console.error("Failed to load gallery");
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Generate previews when selectedImages changes
  useEffect(() => {
    // revoke old URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    const urls = selectedImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // cleanup on unmount
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImages.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);
  };

  const handleRemoveSelected = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImages.length) {
      alert("⚠️ Please select at least one image before uploading.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ You must be logged in to upload images.");
      return;
    }

    setUploading(true);

    try {
      // Loop through each file and upload one by one
      for (const file of selectedImages) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error("❌ Error uploading one of the images:", data);
          alert(
            `❌ Failed to upload "${file.name}": ${
              data.message || "Upload failed"
            }`
          );
        }
      }

      alert("✅ Images uploaded successfully!");
      setShowForm(false);
      setSelectedImages([]);
      setPreviewUrls([]);
      fetchGalleryImages();
    } catch (err) {
      console.error("❌ Error uploading:", err);
      alert("⚠️ Server error — please try again later.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ You must be logged in to delete images.");
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Gallery post deleted successfully");
        setGalleryImages((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(`❌ ${data.message || "Error deleting gallery post"}`);
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("⚠️ Server error — please try again later.");
    } finally {
      setDeletingId(null);
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
            onClick={() => {
              setShowForm(false);
              setSelectedImages([]);
            }}
          >
            <span className="text-2xl">
              <IoMdClose />
            </span>
          </button>

          <div className="mb-4">
            <label className="block mb-1 text-[#ce7b00] font-medium">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full px-4 py-3 border border-[#aca9a9] rounded-xl text-sm"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              You can select multiple images.
            </p>
          </div>

          {/* Preview selected images */}
          {selectedImages.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Preview</p>
              <div className="grid grid-cols-3 gap-2">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-full h-24 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 text-xs"
                      onClick={() => handleRemoveSelected(index)}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#18a000] text-white px-6 py-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      )}

      {/* Gallery Images */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center place-content-center pt-3">
        {/* Skeletons while loading */}
        {loadingGallery &&
          [1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className="
        lg:w-[370px] w-[350px]
        lg:h-[340px] h-[290px]
        rounded-xl shadow
        overflow-hidden
        bg-gray-300
        animate-pulse
      "
            >
              {/* Fake image area */}
              <div className="w-full h-full bg-gray-200" />
            </div>
          ))}

        {!loadingGallery &&
          galleryImages.map((item, index) => (
            <div
              key={item._id || index}
              className="group relative lg:w-[370px] w-[350px] lg:h-[340px] h-[290px] overflow-hidden rounded-xl shadow"
            >
              <Image
                src={item.image.url}
                alt="gallery"
                width={370}
                height={340}
                className="w-full h-full object-cover"
              />

              {/* Hover overlay with delete button */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deletingId === item._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
