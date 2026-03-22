import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { mun1, mun2, mun3, mun4, mun5, mun6, mun7, mun8, mun9 } from "../assets";

const Gallary = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, src: mun1, alt: "Dog receiving care",    caption: "Bruno — receiving daily meals, now thriving" },
    { id: 2, src: mun2, alt: "Shelter feeding time",          caption: "Morning feeding at our Jaipur shelter" },
    { id: 3, src: mun3, alt: "Vet examining a cat",   caption: "Dr. Nisha conducting checkup on a street cat" },
    { id: 4, src: mun4, alt: "Adoption day event",            caption: "Adoption drive — 12 animals found homes in one day" },
    { id: 5, src: mun5, alt: "Volunteers with animals",       caption: "Our incredible volunteer team at the shelter" },
    { id: 6, src: mun6, alt: "Cow at shelter",      caption: "Gauri — receiving nutritious meals and care" },
    { id: 7, src: mun7, alt: "Bird rehabilitation",           caption: "Street pigeon recovering nicely" },
    { id: 8, src: mun8, alt: "NGO team visit",                caption: "Field visit to a supported NGO in Ajmer" },
    { id: 9, src: mun9, alt: "Animal camp for strays",        caption: "Free veterinary camp for strays in Tonk" },
  ];

  return (
    <section className="py-20 px-6 bg-[#FAF7F2]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="section-label justify-center">From the Field</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A140C] mt-3">
            Our <span className="text-[#1E5C3A]">Gallery</span>
          </h2>
          <p className="text-[#6B5642] mt-4 text-lg max-w-xl mx-auto">Real moments from our feeding drives, shelters, and NGO partnerships.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div key={img.id} initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
              className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
              onClick={() => setSelectedImage(img)}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#1A3D28]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <ZoomIn className="w-8 h-8 text-white mb-2" />
                <p className="text-white text-sm font-medium text-center">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-white hover:text-[#C8861A] transition-colors"
              onClick={() => setSelectedImage(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.div className="max-w-3xl w-full" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full rounded-2xl" />
              <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallary;
