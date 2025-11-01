// import MainNavbar from "../../../component/mainNavbar/page";
// import { notFound } from "next/navigation"; // ✅ make sure this is imported

// export const services = [
//   {
//     id: "Dental-Crowns-and-Bridges",
//     title: "Dental Crowns and Bridges",
//     description: `A dental crown is a cap that covers a damaged or weakened tooth, restoring its shape, strength, and appearance. Made from materials like porcelain, ceramic, or metal alloys, crowns provide a durable, natural-looking result. They are ideal for protecting a tooth after a root canal treatment, a broken tooth, or for improving the appearance of a discolored tooth.
//                 A bridge is a replacement for a missing tooth, typically gaining support from the teeth adjacent to the missing one. A bridge may be indicated in the following situations: to restore function, improve appearance, and prevent shifting of nearby teeth`,
//   },
//   {
//     id: "Tooth-Extraction",
//     title: "Tooth Extraction",
//     description:
//       "Tooth extraction is the removal of a tooth from its socket in the jaw. It is typically a last resort, performed to prevent further oral health issues when a tooth cannot be repaired or restored.",
//   },
//   {
//     id: "rootcanal-treatment",
//     title: "Rootcanal Treatment",
//     description:
//       "A root canal is a treatment for infection or damage inside the tooth pulp, which contains nerves and blood vessels. This procedure involves removing the infected pulp, cleaning the inner canals of the tooth, and sealing it to prevent further infection. Afterwards, the tooth is typically restored with a crown for protection and function.",
//   },
//   {
//     id: "Dental-Aligners",
//     title: "Dental Aligners",
//     description: `Dental aligners are custom-made, clear plastic trays that gradually shift your teeth into the desired position.
// Pros of Aligners:

// Nearly invisible

// More comfortable than traditional braces

// Fewer orthodontic visits required

// Cons of Aligners:

// Not ideal for complex or severe misalignments that require traditional braces`,
//   },
//   {
//     id: "Smile-Makeover",
//     title: "Smile Makeover",
//     description: `When teeth are misaligned, discolored, or damaged, a smile makeover is exactly what’s needed to brighten your smile. This is  done using crowns and veneers.  the decision  of whether a crown or veneers is used primarly depends on the amount of remaining natural tooth structure.
// Step 1: You’ll consult with our cosmetic specialists so we can understand  your  goals .
// Step 2: A treatment plan is laid out, and a wax mock up is performed so you can understand what the final result will look before we start the actual in your mouth.
// Step 3: Within a few days, your smile will be  transformed by magic of  of veneers or ceramic crowns.`,
//   },
//   {
//     id: "laser-dentistry",
//     title: "Laser Dentistry",
//     description:
//       "Laser dentistry allows for pain-free procedures with faster healing. It’s used for gum treatments, cavity removal, and more with precision and minimal discomfort. Experience modern dental care with advanced technology.",
//   },
//   {
//     id: "Tooth-Whitening",
//     title: "Orthodontic Treatment",
//     description:
//       "Tooth whitening is a cosmetic dental treatment designed to lighten the color of your teeth and remove stains or discoloration. At VKV Dental Clinic, we offer both in-office whitening treatments and at-home whitening kits to help you achieve a brighter, more confident smile.",
//   },
// ];

// type Props = {
//   params: { mainserviceid: string };
// };

// export default function Mainserviceid({ params }: Props) {
//   const service = services.find((s) => s.id === params.mainserviceid);

//   if (!service) return notFound();

//   return (
//     <>
//       <MainNavbar />
//       <div className="min-h-screen px-4 md:px-16 pt-20 bg-white text-black">
//         <h1 className="text-3xl md:text-5xl font-semibold mb-6">
//           {service.title}
//         </h1>
//         <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
//           {service.description}
//         </p>
//       </div>
//     </>
//   );
// }
"use client";

import { useParams, notFound } from "next/navigation";
import MainNavbar from "../../../component/mainNavbar/page";
import { apiClient } from "@/src/utlis/apiClinet";
import { useEffect, useState } from "react";

interface ServiceData {
  _id: string;
  id: string;
  title: string;
  description: string;
}

export default function Mainserviceid() {
  const { mainserviceid } = useParams(); // ✅ works on client side
  const [service, setService] = useState<ServiceData | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await apiClient("/services");
        const found = res.data.find(
          (s: ServiceData) => s._id === mainserviceid
        );
        setService(found || null);
      } catch (err) {
        console.error("Error fetching service:", err);
      }
    };

    if (mainserviceid) {
      fetchService();
    }
    console.log("id", mainserviceid);
  }, [mainserviceid]);

  if (!service) return notFound();

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen px-4 md:px-16 pt-20 bg-white text-black">
        <h1 className="text-3xl md:text-5xl font-semibold mb-6">
          {service.title}
        </h1>
        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
          {service.description}
        </p>
      </div>
    </>
  );
}
