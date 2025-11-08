import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "VKV",
  description: "Dental clinic",
  icons: {
    icon: [
      {
        url: "/images/logo.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
