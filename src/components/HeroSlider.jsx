import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HeroSlider = ({ images }) => {
  return (
    <div className="relative w-full h-screen">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="relative">
            <div
              className="w-full h-screen bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/30 before:to-black/50"
              style={{ backgroundImage: `url('${img}')` }}
            >
              {/* Content overlay can go here */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>

      {/* Sidebar Social Media Icons - Hidden on small screens */}
      <div className="absolute left-4 md:left-5 top-1/3 space-y-3 md:space-y-4 z-10 hidden sm:block">
        {[
          { Icon: FaFacebookF, url: "#" },
          { Icon: FaInstagram, url: "#" },
          { Icon: FaLinkedinIn, url: "#" },
          { Icon: FaDiscord, url: "#" },
          { Icon: FaYoutube, url: "#" },
        ].map(({ Icon, url }, idx) => (
          <motion.a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 md:p-4 bg-[#2D6A4F] rounded-md shadow-md flex items-center justify-center cursor-pointer hover:bg-opacity-80"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="text-white text-lg md:text-xl" />
          </motion.a>
        ))}
      </div>

      {/* Mobile Social Icons Row */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center space-x-3 z-50 sm:hidden">
        {[
          { Icon: FaFacebookF, url: "#" },
          { Icon: FaInstagram, url: "#" },
          { Icon: FaLinkedinIn, url: "#" },
          { Icon: FaDiscord, url: "#" },
          { Icon: FaYoutube, url: "#" },
        ].map(({ Icon, url }, idx) => (
          <motion.a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#2D6A4F] rounded-md shadow-md flex items-center justify-center cursor-pointer hover:bg-opacity-80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="text-white text-sm" />
          </motion.a>
        ))}
      </div>

      {/* Right-Side Vertical Buttons */}
      <div className="fixed right-4 md:right-5 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 md:space-y-6 z-50">
        {/* FAQs Button */}
        <motion.button
          className="relative flex items-center justify-center px-3 py-2 md:px-5 md:py-4 text-sm md:text-lg font-semibold bg-[#2D6A4F] text-white rounded-full shadow-lg backdrop-blur-lg bg-opacity-90 transition-all hover:bg-opacity-100 hover:shadow-2xl"
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          FAQs
        </motion.button>

        {/* Calendar Button */}
        <motion.button
          className="relative flex items-center justify-center px-3 py-2 md:px-5 md:py-4 text-sm md:text-lg font-semibold bg-[#2D6A4F] text-white rounded-full shadow-lg backdrop-blur-lg bg-opacity-90 transition-all hover:bg-opacity-100 hover:shadow-2xl"
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          Calendar
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSlider;
