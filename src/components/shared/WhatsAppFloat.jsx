import Link from "next/link";
import { FaComments } from "react-icons/fa";

const WhatsAppFloat = () => {
  return (
    <Link
      href="https://wa.me/923260882255"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us"
      className="group fixed bottom-20 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8BB44] text-[#001B08] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white sm:bottom-22 sm:right-7 sm:h-14 sm:w-14"
    >
      <FaComments className="text-xl sm:text-2xl" />

      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-[#001B08] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:block">
        Need help? Chat with us
      </span>
    </Link>
  );
};

export default WhatsAppFloat;