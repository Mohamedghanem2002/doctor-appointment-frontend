import React from "react";
import Slider from "react-slick";
import carousel_1 from "../img/hero-carousel-1.jpg";
import carousel_2 from "../img/hero-carousel-2.jpg";
import carousel_3 from "../img/hero-carousel-3.jpg";

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
    speed: 800,
  };

  const slides = [
    {
      image: carousel_1,
      title: "Your Health, Our Priority",
      text: "We provide comprehensive healthcare services to ensure your well-being.",
    },
    {
      image: carousel_2,
      title: "Specialized Medical Services",
      text: "We provide comprehensive healthcare services to ensure your well-being.",
    },
    {
      image: carousel_3,
      title: "Easy Online Appointments",
      text: "We provide comprehensive healthcare services to ensure your well-being.",
    },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            {/* الخلفية */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* التعتيم والنص */}
            <div
              className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center 
              text-center text-white px-6 md:px-12 transition-all duration-500"
            >
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#46daea] mb-4 
                drop-shadow-lg leading-snug"
              >
                {slide.title}
              </h2>

              <p
                className="max-w-2xl text-base sm:text-lg md:text-xl mb-6 
                text-gray-100 leading-relaxed drop-shadow-sm"
              >
                {slide.text}
              </p>

              <button
                className="bg-[#00c3cf] hover:bg-[#00a8b2] text-white font-semibold 
                px-8 py-3 rounded-lg shadow-md transition-transform duration-300 
                hover:-translate-y-1"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default HeroSlider;
