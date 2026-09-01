"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="btn btn-circle fixed bottom-6 right-6 z-50 h-11 min-h-11 w-11 border-0 bg-[#001B08] text-[#E8BB44] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8BB44] hover:text-[#001B08] sm:bottom-7 sm:right-7 sm:h-12 sm:min-h-12 sm:w-12"
    >
      <FaArrowUp className="text-sm sm:text-base" />
    </button>
  );
};

export default BackToTop;