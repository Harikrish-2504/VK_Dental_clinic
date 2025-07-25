"use client";

import Image from "next/image";
import vectorone from "../../../public/images/vectorone.png";
import login from "../../../public/images/login.jpg";
import vectortwo from "../../../public/images/vectortwo.png";
import teeth from "../../../public/images/teeth.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/src/utlis/apiClinet";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await apiClient(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
        false
      ); // `false` = don't send token for login

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      alert("Login successful!");
      router.push("/pannel"); // or wherever
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f5f5] overflow-hidden">
      <div className="w-[1000px] bg-[#fff] rounded-2xl relative overflow-hidden min-h-[650px] flex items-center justify-center shadow-lg">
        {/* Bottom-left vector */}
        <div className="absolute bottom-0 left-0 z-0 hidden md:block">
          <Image src={vectorone} alt="Vector One" width={400} height={400} />
        </div>

        {/* Top-right vector */}
        <div className="absolute top-0 right-0 z-0 hidden md:block">
          <Image src={vectortwo} alt="Vector Two" width={400} height={400} />
        </div>

        {/* Login Form Content */}
        <div className="flex w-full max-w-4xl justify-center px-8 ">
          <div className="relative z-10 text-center w-full max-w-md bg-[#fff] rounded-l-xl md:rounded-r-[0px] rounded-r-xl  px-8 shadow-2xl flex flex-col ">
            {/* Image container with fixed height */}
            <div className="z-10  flex justify-center">
              <Image
                src={teeth}
                width={300}
                height={300} // Set a fixed height for image
                alt="img"
                objectFit="cover"
              />
            </div>
            <h2 className="text-4xl font-bold text-[#ff7c25] mb-6">Welcome</h2>
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <div className="flex flex-col">
                <label className="text-[#ff7c25] text-start">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="border-0 border-b-2 border-[#bc641c]  focus:outline-none focus:ring-0 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#ff7c25] text-start">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="border-0 border-b-2 border-[#ff7c25]  focus:outline-none focus:ring-0 transition"
                />
              </div>
              <div className="mb-8 ">
                <button
                  type="submit"
                  className="bg-[#E68120] text-white rounded-xl py-3 px-24 hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          {/* Image container with fixed height */}
          <div className="z-10  w-[500px] h-[500px] relative hidden md:block">
            <Image
              src={login}
              alt="img"
              fill
              className="object-cover rounded-r-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
