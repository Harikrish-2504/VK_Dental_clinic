"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import testimonialImg from "../../../../public/images/defaultprofileimg.png";
import { apiClient } from "@/src/utlis/apiClinet";

interface TestimonialData {
  _id: string;
  name: string;
  place: string;
  comment: string;
  image?: {
    filename: string;
    path: string;
    mimetype: string;
    size: number;
    url?: string;
  };
}

export default function Testimonial() {
  const [showForm, setShowForm] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const fetchTestimonials = async () => {
    try {
      const res = await apiClient("/testimonials", { method: "GET" }, false);
      // if apiClient throws on non-ok, this will be the JSON success response
      setTestimonials(res.data || res);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  const openAddForm = () => {
    setEditMode(false);
    setEditingId(null);
    setName("");
    setPlace("");
    setComment("");
    setImageFile(null);
    setShowForm(true);
  };

  const handleClose = () => setShowForm(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("place", place);
      form.append("comment", comment);
      if (imageFile) form.append("image", imageFile);

      if (editMode && editingId) {
        const res = await apiClient(`/testimonials/${editingId}`, {
          method: "PUT",
          body: form,
        });
        if (res.success) {
          fetchTestimonials();
          setShowForm(false);
        }
      } else {
        const res = await apiClient("/testimonials", {
          method: "POST",
          body: form,
        });
        if (res.success) {
          fetchTestimonials();
          setShowForm(false);
        }
      }
    } catch (err) {
      console.error("Error submitting testimonial:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await apiClient(`/testimonials/${id}`, { method: "DELETE" });
      if (res.success) fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    }
  };

  const handleEdit = (item: TestimonialData) => {
    setEditMode(true);
    setEditingId(item._id);
    setName(item.name || "");
    setPlace(item.place || "");
    setComment(item.comment || "");
    setPreview(item.image?.url || null);
    setImageFile(null);
    setShowForm(true);
  };

  return (
    <section className="lg:ml-60 " id="testimonial">
      <div className="container">
        <div className="flex justify-end lg:my-6">
          <button
            onClick={openAddForm}
            className="bg-[#44BBEE] text-white font-medium md:text-lg text-sm py-3 md:px-7 px-4 rounded-xl"
          >
            ADD
          </button>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:py-10 py-5 gap-8">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center text-center p-6 shadow-md bg-white rounded-2xl hover:shadow-lg transition"
            >
              <div className="rounded-full mb-4 overflow-hidden w-[100px] h-[100px]">
                <Image
                  src={ item.image?.url || testimonialImg}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <p className="text-sm md:text-base text-gray-700 mb-4 max-w-[350px]">
                {item.comment}
              </p>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <h3 className="text-sm text-gray-500">{item.place}</h3>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 rounded-2xl w-[90%] md:w-[500px] shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {editMode ? "Edit Testimonial" : "Add Testimonial"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="mt-2 w-24 h-24 rounded-full object-cover"
                    />
                  )}
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  name="text"
                  placeholder="Enter testimonial"
                  className="border rounded-lg p-2"
                  required
                />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="Enter name"
                  className="border rounded-lg p-2"
                  required
                />

                <input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  name="location"
                  placeholder="Enter Place"
                  className="border rounded-lg p-2"
                  required
                />

                <div className="flex justify-between mt-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#44BBEE] text-white px-4 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
