import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slide.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="relative w-full h-90vh overflow-hidden bg-dark">
      <AiOutlineArrowLeft
        className="arrow prev border-2 border-orangered rounded-full bg-transparent text-white w-10 h-10 absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer"
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        className="arrow next border-2 border-orangered rounded-full bg-transparent text-white w-10 h-10 absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
        onClick={nextSlide}
      />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={
              index === currentSlide
                ? "slide flex items-center justify-center"
                : "hidden slide" // Hide inactive slides
            }
          >
            <img src={image} alt="slide" className="w-full h-96" />
            <div className="content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-black bg-opacity-40 text-white p-6 rounded-lg animate-slide-up flex flex-col items-center">
              <h2 className="text-4xl mb-4">{heading}</h2>
              <p className="mb-4">{desc}</p>
              <hr className="h-2 bg-white w-1/2 mx-auto" />
              <a
                href="#product"
                className=" inline-block mt-4 px-4 py-2 rounded-full bg-blue-700 text-white"
              >
                Shop Now
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
