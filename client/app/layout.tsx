import {Poppins } from "next/font/google";
import type {Metadata} from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "VKV",
  description: "Generated by create next app",
};
const poppins = Poppins ({
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
      
        {children}</body>
    </html>
  );
}
