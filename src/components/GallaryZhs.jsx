import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  zhs1,
  zhs2,
  zhs3,
  zhs4,
  zhs5,
  zhs6,
  zhs7,
  zhs8,
  zhs9,
} from "../assets";

const GallaryZhs = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample gallery data - replace with your actual images
  const galleryImages = [
    {
      id: 1,
      src: zhs1,
      alt: "Ceremony inauguration with lamp lighting",
      caption: "Opening ceremony with traditional lamp lighting",
    },
    {
      id: 2,
      src: zhs2,
      alt: "Computer lab session",
      caption: "Participants in the technical workshop",
    },
    {
      id: 3,
      src: zhs3,
      alt: "Audience in conference hall",
      caption: "Students attending the keynote session",
    },
    {
      id: 4,
      src: zhs4,
      alt: "Round table discussion",
      caption: "Panel discussion with industry experts",
    },
    {
      id: 5,
      src: zhs5,
      alt: "Group photo of participants",
      caption: "United for Animal WelfareMUN delegates networking session",
    },
    {
      id: 6,
      src: zhs6,
      alt: "Presentation session",
      caption: "Student presentation on global policies",
    },
    {
      id: 7,
      src: zhs7,
      alt: "Conference audience",
      caption: "Full house at the plenary session",
    },
    {
      id: 8,
      src: zhs8,
      alt: "Workshop session",
      caption: "Interactive workshop on diplomatic negotiations",
    },
    {
      id: 9,
      src: zhs9,
      alt: "Award ceremony",
      caption: "Closing ceremony and award distribution",
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="py-12 px-4  md:px-8 lg:px-16 bg-gradient-to-b from-white to-orange-50min-h-screen shadow-2xl">
      {/* Header with animation */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-600 mb-2"
        >
          Beautiful Snapshots Of Our Last
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-500"
        >
          ZERO HOUR SUMMIT
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-1 bg-orange-500 mx-auto mt-6"
        />
      </div>

      {/* Gallery grid with animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="overflow-hidden rounded-lg shadow-xl bg-white/5 group cursor-pointer"
            onClick={() => openModal(image)}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
              <p className="text-white text-lg">{selectedImage.caption}</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* "View All" button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-12 text-center"
      >
        {/* <button className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105">
            View All Photos
          </button> */}
      </motion.div>
    </div>
  );
};

export default GallaryZhs;
