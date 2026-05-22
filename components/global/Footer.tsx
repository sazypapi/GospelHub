import { Mail, Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-white border-t-2 border-neutral-400 lg:pb-0 pb-20 text-black w-full flex flex-col justify-center items-center pt-8 px-8 mt-[10vh]">
      <h3 className="font-azonix text-sm border-b border-neutral-800 pb-3 mb-1 text-center">
        WEBSITE AND GRAPHICS BY ZEDEK&apos;S MEDIA
      </h3>
      <div className="flex justify-center items-center my-3 gap-10">
        <a href="https://www.instagram.com/zedeks.media?igsh=aHZlcXVsMnY1bzV4">
          <FaInstagram className="h-6 w-6 text-black" />
        </a>
        <a href="mailto:zedeksmedia24@gmail.com">
          <Mail className="h-6 w-6 text-black" />
        </a>
        <a href="tel:08089033810">
          <Phone className="h-6 w-6 text-black" />
        </a>
        <a href="https://api.whatsapp.com/send?phone=2348089033810&text=I%20want%20to%20make%20an%20enquiry%0A">
          <FaWhatsapp className="h-6 w-6 text-black" />
        </a>
      </div>
      <h6 className="font-azonix text-xs mt-5 text-black">
        ZEDEK&apos;S MEDIA 2026 &#169;
      </h6>
    </footer>
  );
}

export default Footer;
