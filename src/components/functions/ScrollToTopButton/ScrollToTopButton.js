"use client"
import React, { useState, useEffect } from "react";
import "./ScrollToTopButtonCSS.css";
import UpArrowIcon from "./arrowUpSolid.svg"
import Image from "next/image";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <p onClick={scrollToTop} >
          <Image className="scroll-to-top-btn" src={UpArrowIcon} alt="Scroll to top" width={32} height={32} />
        </p>
      )}
    </>
  );
};

export default ScrollToTopButton;
