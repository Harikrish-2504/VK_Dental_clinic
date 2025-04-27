import panelgallery from "../../../../public/images/pannel-g.png";
import Image from "next/image";
export default function gallery (){
    return(
        <>
        <div className="lg:ml-60  px-4 "> {/* Padding top for Navbar, margin-left for Sidebar */}
  <div className="flex justify-end lg:my-6">
    <button className="bg-[#44BBEE] text-white font-medium md:text-lg text-sm py-3 md:px-7 px-4 rounded-xl">
      ADD
    </button>
  </div>

  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center place-content-center pt-3">
    {[panelgallery,panelgallery,panelgallery,panelgallery,panelgallery,panelgallery,panelgallery,panelgallery,panelgallery,panelgallery,panelgallery].map((img, index) => (
      <div key={index} className="lg:w-[370px] w-[350px] lg:h-[340px] h-[290px] overflow-hidden">
        <Image
          src={img}
          alt={`gallery-${index}`}
          width={347}
          height={270}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>

        </>
    )
}