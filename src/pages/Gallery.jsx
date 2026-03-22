import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, ArrowLeft, Images } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ═══════════════════════════════════════════
   GALLERY DATA — Add new event categories here
   Each category has: id, title, description, icon, coverImage, images[]
   ═══════════════════════════════════════════ */
const GALLERY_CATEGORIES = [
  {
    id: "cow-feeding",
    title: "Cow Feeding",
    description: "Our teams feed 7,000+ street cows across Rajasthan with nutrition drives, ensuring no sacred animal goes hungry.",
    icon: "🐄",
    date: "Ongoing since 2026",
    coverImage: "/gallery/cow-feeding/cow1.jpg",
    images: [
      { src: "/gallery/cow-feeding/cow1.jpg", caption: "Feeding green fodder to a cow at the shelter" },
      { src: "/gallery/cow-feeding/cow2.jpg", caption: "A heartwarming moment — a young child bonds with a calf" },
      { src: "/gallery/cow-feeding/cow3.jpg", caption: "Caring for a young calf living on the streets" },
      { src: "/gallery/cow-feeding/cow7.jpeg", caption: "🐄" },
      { src: "/gallery/cow-feeding/cow8.jpeg", caption: "🐮" },
      { src: "/gallery/cow-feeding/cow9.jpeg", caption: "🤠" }
    ],
  },
  {
    id: "youth-kickstart",
    title: "Youth Kickstart Programme",
    description: "Supporting talented youth from financially challenged backgrounds — providing sports training, education, accommodation and nutrition.",
    icon: "⚽",
    date: "Running for 4–5 Years",
    coverImage: "/gallery/youth-kickstart/yk1.jpg",
    images: [
      { src: "/gallery/youth-kickstart/yk1.jpg", caption: "Jersey reveal — JCFC players showcase their new kits at the official signing" },
      { src: "/gallery/youth-kickstart/yk2.jpg", caption: "Jaipur City FC squad lined up in pink — proud to represent" },
      { src: "/gallery/youth-kickstart/yk3.jpg", caption: "Team photo after a hard-fought training session on the pitch" },
      { src: "/gallery/youth-kickstart/yk4.jpg", caption: "Champions! The squad celebrates with the trophy after a winning campaign" },
      { src: "/gallery/youth-kickstart/yk5.jpg", caption: "Nutrition matters — players sharing a meal together at the hostel" },
      { src: "/gallery/youth-kickstart/yk9.jpeg", caption: "“From dreams to the field — where passion meets opportunity.”" },
      { src: "/gallery/youth-kickstart/yk10.jpeg", caption: "“Stronger together — on and off the field.”" }
    ],
  },
  // Placeholder categories — will be populated later
  {
    id: "dog-care",
    title: "Dog Care & Radium Collars",
    description: "Caring for 5,000+ stray dogs and fitting them with glow-in-the-dark radium collar belts to save them from road accidents.",
    icon: "🐕",
    date: "Coming Soon",
    coverImage: "/gallery/dog-care/dog1.jpeg",
    images: [
      { src: "/gallery/dog-care/dog1.jpeg", caption: "“A small act of kindness can mean a full meal for someone who cannot ask for it. Together, we can make our streets a little more compassionate.” 🐾💛" },
      { src: "/gallery/dog-care/dog2.jpeg", caption: "“Hunger doesn’t speak—but it’s felt. One bowl at a time, we’re bringing comfort, care, and hope to those who need it most.” 🐶✨" },
      { src: "/gallery/dog-care/dog3.jpeg", caption: "“Every life matters, no matter how small. Your support helps us turn moments like these into everyday realities.” 🐾❤️" }
    ],
  },
  {
    id: "girls-hygiene",
    title: "Girls' Hygiene Drive",
    description: "Distributing sanitary hygiene pads to girls in slum areas — giving them dignity, health and confidence every month.",
    icon: "💜",
    date: "Coming Soon",
    coverImage: "/gallery/girls-hygiene/gh1.jpeg",
    images: [
      { src: "/gallery/girls-hygiene/gh1.jpeg", caption: "“Dignity begins with care. A small gesture today can bring comfort, confidence, and hope tomorrow.” 🌼💙" },
      { src: "/gallery/girls-hygiene/gh2.jpeg", caption: "“Stronger together—when women support women, communities rise with them.” 💪✨" },
      { src: "/gallery/girls-hygiene/gh3.jpeg", caption: "“Not just essentials, but respect and compassion—delivered hand to hand.” 🤝💛" },
      { src: "/gallery/girls-hygiene/gh4.jpeg", caption: "“Every packet carries more than aid—it carries reassurance that someone cares.” 🌸📦" },
      { src: "/gallery/girls-hygiene/gh5.jpeg", caption: "“Hope grows where care is shared. Together, we’re building healthier, safer futures for every woman and child.” 🌱❤️" },
      { src: "/gallery/girls-hygiene/gh6.mp4", caption: "“Dignity, health, and confidence — every girl deserves it.”" }
    ],
  },
  {
    id: "education",
    title: "Education Support",
    description: "Providing books, stationery and geometric boxes to underprivileged students so no child is denied the right to learn.",
    icon: "📚",
    date: "Coming Soon",
    coverImage: null,
    images: [],
  },
  {
    id: "plantation",
    title: "Environment & Plantation",
    description: "Plantation drives to combat climate change, deforestation and pollution — building greener, healthier communities.",
    icon: "🌳",
    date: "Coming Soon",
    coverImage: "/gallery/plantation/plt1.jpeg",
    images: [
      { src: "/gallery/plantation/plt1.jpeg", caption: "“Today we planted a sapling, tomorrow it will grow into hope. Small actions today create a greener, healthier future for all.” 🌱🌍💚" }
    ],
  },
];

/* ── Animations ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const staggerWrap = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const staggerChild = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Video detection helper ── */
const isVideo = (src) => /\.(mp4|mov|webm|avi)$/i.test(src);

/* ═══════════════════════════════
   CATEGORY CARD
   ═══════════════════════════════ */
function CategoryCard({ category, onClick }) {
  const hasImages = category.images.length > 0;

  return (
    <motion.div
      variants={staggerChild}
      className="gallery-category-card"
      onClick={() => hasImages && onClick(category)}
      style={{
        cursor: hasImages ? "pointer" : "default",
        opacity: hasImages ? 1 : 0.6,
      }}
    >
      {/* Image area */}
      <div className="gallery-category-card__img">
        {category.coverImage ? (
          <img src={category.coverImage} alt={category.title} />
        ) : (
          <div className="gallery-category-card__placeholder">
            <span style={{ fontSize: "3.5rem" }}>{category.icon}</span>
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginTop: 8 }}>
              Photos coming soon
            </p>
          </div>
        )}

        {/* Memory count badge */}
        {hasImages && (
          <div className="gallery-memory-badge">
            <Camera style={{ width: 13, height: 13 }} />
            <span>{category.images.length} {category.images.length === 1 ? "memory" : "memories"}</span>
          </div>
        )}

        {/* Hover overlay */}
        {hasImages && (
          <div className="gallery-category-card__overlay">
            <Images style={{ width: 32, height: 32, color: "white", marginBottom: 8 }} />
            <p style={{ fontFamily: "var(--f-body)", fontSize: "0.9rem", fontWeight: 600, color: "white" }}>
              View Gallery
            </p>
          </div>
        )}

        {/* Bottom gradient for text */}
        <div className="gallery-category-card__gradient" />
      </div>

      {/* Text body */}
      <div className="gallery-category-card__body">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: "1.4rem" }}>{category.icon}</span>
          <h3 className="gallery-category-card__title">{category.title}</h3>
        </div>
        <p className="gallery-category-card__desc">{category.description}</p>
        <div className="gallery-category-card__date">
          <span>{category.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════
   PHOTO GALLERY VIEW (Masonry/grid of photos after clicking a category)
   ═══════════════════════════════ */
function PhotoGalleryView({ category, onBack, onImageClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back button + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            fontFamily: "var(--f-body)", fontSize: "0.88rem", fontWeight: 600,
            color: "#F3842C", background: "#FFF4EB",
            border: "none", borderRadius: 12, padding: "10px 20px",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          All Categories
        </motion.button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: 12 }}>{category.icon}</span>
        <h2 style={{
          fontFamily: "var(--f-display)", fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700, color: "var(--c-bark)", lineHeight: 1.15, marginBottom: 12,
        }}>
          {category.title}
        </h2>
        <p style={{
          fontFamily: "var(--f-body)", fontSize: "1rem", color: "var(--c-bark-muted)",
          maxWidth: 500, margin: "0 auto", lineHeight: 1.7,
        }}>
          {category.description}
        </p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginTop: 16, fontFamily: "var(--f-body)", fontSize: "0.82rem",
          fontWeight: 600, color: "#F3842C", background: "#FFF4EB",
          padding: "6px 16px", borderRadius: 99,
        }}>
          <Camera style={{ width: 14, height: 14 }} />
          {category.images.length} {category.images.length === 1 ? "Photo" : "Photos"}
        </div>
      </div>

      {/* Photo Grid — Masonry-like with varying sizes */}
      <motion.div
        className="gallery-photo-grid"
        variants={staggerWrap}
        initial="hidden"
        animate="visible"
      >
        {category.images.map((img, i) => (
          <motion.div
            key={i}
            variants={staggerChild}
            className={`gallery-photo-item ${i === 0 ? "gallery-photo-item--large" : ""}`}
            onClick={() => onImageClick(i)}
          >
            {isVideo(img.src) ? (
              <>
                <video src={img.src} muted preload="metadata" playsInline />
                <div className="gallery-photo-item__play">
                  <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </>
            ) : (
              <img src={img.src} alt={img.caption} />
            )}
            <div className="gallery-photo-item__overlay">
              <p>{img.caption}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════
   LIGHTBOX — Full-screen image viewer with carousel
   ═══════════════════════════════ */
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const image = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="gallery-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button className="gallery-lightbox__close" onClick={onClose}>
        <X style={{ width: 24, height: 24 }} />
      </button>

      {/* Counter */}
      <div className="gallery-lightbox__counter">
        <span style={{ fontFamily: "var(--f-number)", fontWeight: 700, color: "#F3842C" }}>
          {currentIndex + 1}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)", margin: "0 4px" }}>/</span>
        <span style={{ fontFamily: "var(--f-number)", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
          {images.length}
        </span>
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft style={{ width: 28, height: 28 }} />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="gallery-lightbox__image-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo(image.src) ? (
              <video
                src={image.src}
                controls
                autoPlay
                playsInline
                style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 16, objectFit: "contain", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
              />
            ) : (
              <img src={image.src} alt={image.caption} />
            )}
          <motion.p
            className="gallery-lightbox__caption"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {image.caption}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight style={{ width: 28, height: 28 }} />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="gallery-lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => (
            <button
              key={i}
              className={`gallery-lightbox__thumb ${i === currentIndex ? "gallery-lightbox__thumb--active" : ""}`}
              onClick={(e) => { e.stopPropagation(); onNext(i); }}
            >
              {isVideo(img.src) ? (
                <video src={img.src} muted preload="metadata" />
              ) : (
                <img src={img.src} alt="" />
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════
   MAIN GALLERY PAGE
   ═══════════════════════════════ */
export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const loc = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const catId = params.get('category');
    if (catId) {
      const cat = GALLERY_CATEGORIES.find(c => c.id === catId);
      if (cat) {
        setSelectedCategory(cat);
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      }
    } else {
      setSelectedCategory(null);
    }
  }, [loc.search]);

  const openCategory = useCallback((category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closeCategory = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const goToPrev = useCallback(() => {
    if (!selectedCategory) return;
    setLightboxIndex((prev) =>
      prev === 0 ? selectedCategory.images.length - 1 : prev - 1
    );
  }, [selectedCategory]);

  const goToNext = useCallback((specificIndex) => {
    if (!selectedCategory) return;
    if (typeof specificIndex === "number") {
      setLightboxIndex(specificIndex);
    } else {
      setLightboxIndex((prev) =>
        prev === selectedCategory.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedCategory]);

  // Cleanup overflow on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{ background: "var(--c-cream)" }}>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="page-hero">
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div {...fadeUp(0.05)} style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <span className="badge badge-amber">📸 Capturing Our Impact</span>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} style={{
            fontFamily: "var(--f-display)", fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
            fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 12,
          }}>
            Our <span style={{ color: "#F3842C" }}>Gallery</span>
          </motion.h1>
          <motion.p {...fadeUp(0.18)} style={{
            fontFamily: "var(--f-body)", fontSize: "1.1rem", fontWeight: 400,
            color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Moments of compassion, kindness, and change — captured from the field.
          </motion.p>
        </div>
      </section>

      {/* ═══════════ GALLERY CONTENT ═══════════ */}
      <section style={{ padding: "80px 0 120px" }}>
        <div className="section-container">
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              /* ── Category Cards View ── */
              <motion.div
                key="categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                  <p className="section-label" style={{ justifyContent: "center", marginBottom: 12 }}>
                    Browse By Event
                  </p>
                  <h2 style={{
                    fontFamily: "var(--f-display)",
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                    fontWeight: 700, color: "var(--c-bark)", marginBottom: 12,
                  }}>
                    Event <span className="text-amber-grad">Categories</span>
                  </h2>
                  <p style={{
                    fontFamily: "var(--f-body)", fontSize: "1.02rem",
                    color: "var(--c-bark-muted)", maxWidth: 500, margin: "0 auto",
                  }}>
                    Click on a category to explore all the captured moments from that event.
                  </p>
                </div>

                <motion.div
                  className="gallery-categories-grid"
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      onClick={openCategory}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              /* ── Photo Gallery View ── */
              <PhotoGalleryView
                key="photos"
                category={selectedCategory}
                onBack={closeCategory}
                onImageClick={openLightbox}
              />
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════ LIGHTBOX ═══════════ */}
      <AnimatePresence>
        {lightboxOpen && selectedCategory && (
          <Lightbox
            images={selectedCategory.images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>

      <Footer />

      {/* ═══════════ GALLERY STYLES ═══════════ */}
      <style>{`
        /* ── Category Cards Grid ── */
        .gallery-categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        @media (max-width: 740px) {
          .gallery-categories-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Category Card ── */
        .gallery-category-card {
          background: white;
          border-radius: var(--r-xl);
          overflow: hidden;
          box-shadow: var(--sh-sm);
          border: 1px solid var(--c-sand-light);
          transition: transform 0.35s var(--ease-out), box-shadow 0.35s;
        }
        .gallery-category-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--sh-xl);
        }
        .gallery-category-card__img {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: linear-gradient(135deg, #1A1A2E 0%, #16213E 100%);
        }
        .gallery-category-card__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
          transition: transform 0.6s var(--ease-out);
        }
        .gallery-category-card:hover .gallery-category-card__img img {
          transform: scale(1.08);
        }
        .gallery-category-card__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%);
        }
        .gallery-category-card__gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
          pointer-events: none;
        }
        .gallery-category-card__overlay {
          position: absolute;
          inset: 0;
          background: rgba(243, 132, 44, 0.65);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.35s ease;
          backdrop-filter: blur(2px);
        }
        .gallery-category-card:hover .gallery-category-card__overlay {
          opacity: 1;
        }

        /* Memory badge */
        .gallery-memory-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--f-body);
          font-size: 0.72rem;
          font-weight: 700;
          color: white;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
          padding: 6px 14px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.15);
          z-index: 2;
        }

        /* Card body */
        .gallery-category-card__body {
          padding: 22px 24px 26px;
        }
        .gallery-category-card__title {
          font-family: var(--f-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--c-bark);
          line-height: 1.25;
        }
        .gallery-category-card__desc {
          font-family: var(--f-body);
          font-size: 0.875rem;
          color: var(--c-bark-muted);
          line-height: 1.65;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gallery-category-card__date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--f-body);
          font-size: 0.75rem;
          font-weight: 600;
          color: #F3842C;
          background: #FFF4EB;
          padding: 4px 12px;
          border-radius: 99px;
        }

        /* ── Photo Grid ── */
        .gallery-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .gallery-photo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .gallery-photo-grid {
            grid-template-columns: 1fr;
          }
        }
        .gallery-photo-item {
          position: relative;
          border-radius: var(--r-lg);
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4 / 3;
          background: var(--c-sand-light);
        }
        .gallery-photo-item--large {
          grid-column: span 2;
          grid-row: span 2;
          aspect-ratio: auto;
        }
        @media (max-width: 560px) {
          .gallery-photo-item--large {
            grid-column: span 1;
            grid-row: span 1;
            aspect-ratio: 4 / 3;
          }
        }
        .gallery-photo-item img,
        .gallery-photo-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s var(--ease-out);
        }
        .gallery-photo-item:hover img,
        .gallery-photo-item:hover video {
          transform: scale(1.06);
        }
        .gallery-photo-item__play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }
        .gallery-photo-item__play svg {
          width: 56px;
          height: 56px;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
          background: rgba(0,0,0,0.45);
          border-radius: 50%;
          padding: 14px;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .gallery-photo-item:hover .gallery-photo-item__play svg {
          transform: scale(1.15);
          background: rgba(243,132,44,0.75);
        }
        .gallery-photo-item__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .gallery-photo-item:hover .gallery-photo-item__overlay {
          opacity: 1;
          transform: translateY(0);
        }
        .gallery-photo-item__overlay p {
          font-family: var(--f-body);
          font-size: 0.85rem;
          font-weight: 500;
          color: white;
          line-height: 1.5;
        }

        /* ── Lightbox ── */
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .gallery-lightbox__close {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
        }
        .gallery-lightbox__close:hover {
          background: rgba(243, 132, 44, 0.25);
          border-color: rgba(243, 132, 44, 0.4);
          color: #F3842C;
        }
        .gallery-lightbox__counter {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 10;
          font-family: var(--f-body);
          font-size: 1rem;
          display: flex;
          align-items: center;
          background: rgba(0,0,0,0.5);
          padding: 8px 18px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .gallery-lightbox__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
        }
        .gallery-lightbox__nav:hover {
          background: rgba(243, 132, 44, 0.25);
          border-color: rgba(243, 132, 44, 0.4);
          color: #F3842C;
          transform: translateY(-50%) scale(1.08);
        }
        .gallery-lightbox__nav--prev { left: 20px; }
        .gallery-lightbox__nav--next { right: 20px; }

        @media (max-width: 700px) {
          .gallery-lightbox__nav--prev { left: 8px; }
          .gallery-lightbox__nav--next { right: 8px; }
          .gallery-lightbox__nav { width: 40px; height: 40px; border-radius: 12px; }
        }

        .gallery-lightbox__image-wrap {
          max-width: 900px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gallery-lightbox__image-wrap img {
          max-width: 100%;
          max-height: 70vh;
          border-radius: 16px;
          object-fit: contain;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .gallery-lightbox__caption {
          font-family: var(--f-body);
          font-size: 0.95rem;
          color: rgba(255,255,255,0.75);
          text-align: center;
          margin-top: 20px;
          max-width: 500px;
          line-height: 1.6;
        }

        /* Thumbnail strip */
        .gallery-lightbox__thumbs {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          background: rgba(0,0,0,0.5);
          padding: 8px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .gallery-lightbox__thumb {
          width: 52px;
          height: 38px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.25s;
          padding: 0;
          background: none;
        }
        .gallery-lightbox__thumb:hover {
          opacity: 0.8;
        }
        .gallery-lightbox__thumb--active {
          border-color: #F3842C;
          opacity: 1;
          box-shadow: 0 0 12px rgba(243,132,44,0.3);
        }
        .gallery-lightbox__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </div>
  );
}
