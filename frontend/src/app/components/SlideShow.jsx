"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import img1 from "../../../public/images/banh1.jpg";
import img2 from "../../../public/images/banh2.jpg";
import img3 from "../../../public/images/banh3.jpg";

import classe from "../../app/globals.css";

const images = [
  { image: img1, alt: "slideshow1" },
  { image: img2, alt: "slideshow2" },
  { image: img3, alt: "slideshow3" },
];

export default function ImageSlideShow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        prevIndex < images.length - 1 ? prevIndex + 1 : 0;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={classe.slideshowContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${classe.mySlides} ${
              index === currentImageIndex ? classe.active : ""
            }`}
          >
            <img src={image.image} alt={image.alt} />
          </div>
        ))}
      </div>
    </>
  );
}
