import { useState, useEffect } from "react";
import { ChevronRight, Calendar, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function CommonDonate() {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);

  useEffect(() => {
    // Trigger main entrance animations
    setIsVisible(true);

    // Delay particle animation start
    const timer = setTimeout(() => {
      setParticlesActive(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Background particles with continuous movement
  const particles = Array(12)
    .fill()
    .map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 8) + 8,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      duration: `${Math.random() * 15 + 20}s`,
      delay: `${Math.random() * 5}s`,
      direction: i % 2 === 0 ? "normal" : "reverse",
    }));

  // Background circles with continuous movement
  const circles = Array(5)
    .fill()
    .map((_, i) => ({
      id: i,
      size: (i + 1) * 12 + 12,
      duration: `${20 + i * 5}s`,
      delay: `${i * 2}s`,
      clockwise: i % 2 === 0,
    }));

  return (
    <div className="bg-gradient-to-b from-white to-orange-50 py-16 md:py-12 relative overflow-hidden">
      {/* Animated continuously moving particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full transition-opacity duration-1000 ${
              particlesActive ? "opacity-20" : "opacity-0"
            }`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              backgroundColor: particle.id % 2 === 0 ? "#b91c1c" : "#f97316",
              animation: particlesActive
                ? `moveContinuously ${particle.duration} infinite ${particle.direction} linear`
                : "none",
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Moving circles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className={`absolute rounded-full border-2 transition-opacity duration-1500 ${
              isVisible ? "opacity-10" : "opacity-0"
            }`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              borderColor: circle.id % 2 === 0 ? "#b91c1c" : "#f97316",
              left: "50%",
              top: "50%",
              marginLeft: `-${circle.size / 2}px`,
              marginTop: `-${circle.size / 2}px`,
              animation: isVisible
                ? `orbit${circle.clockwise ? "" : "Reverse"} ${
                    circle.duration
                  } infinite linear`
                : "none",
              animationDelay: circle.delay,
            }}
          />
        ))}
      </div>

      {/* Large background text */}
      <div
        className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-all duration-3000 transform ${
          isVisible ? "opacity-5 scale-100" : "opacity-0 scale-150"
        } pointer-events-none`}
      >
        <div className="text-9xl font-bold tracking-wider text-red-800">
          United for Animal WelfareMUN
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Animated badge */}
          <div
            className={`transition-all duration-700 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-500 px-9 py-3 rounded-full text-sm md:text-xl font-medium inline-flex items-center shadow-sm relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 relative z-10"></span>
              <span className="relative z-10">Join United for Animal Welfare 2026</span>
            </span>
          </div>

          {/* Animated heading with letter animation */}
          <div className="mt-8 relative">
            <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight">
              <div className="overflow-hidden">
                <span
                  className={`block text-red-800 transition-transform duration-1000 delay-300 transform ${
                    isVisible ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  Join Us At The
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  className={`block text-red-800 transition-transform duration-1000 delay-500 transform ${
                    isVisible ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  14th Edition Of
                </span>
              </div>
              <div className="overflow-hidden relative">
                <span
                  className={`block text-orange-500 transition-transform duration-1000 delay-700 transform ${
                    isVisible ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  United for Animal WelfareMUN
                </span>
                <span
                  className={`absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-red-800 to-orange-500 transition-all duration-1000 delay-1200 transform origin-left ${
                    isVisible ? "scale-x-100" : "scale-x-0"
                  }`}
                ></span>
              </div>
            </h1>
          </div>

          {/* Description text with animated highlight */}
          <p
            className={`mt-8 text-gray-600 max-w-2xl text-lg md:text-xl transition-all duration-1000 delay-900 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Join a Legacy of Global Changemakers – More Than
            <span
              className="font-semibold text-red-800 relative inline-block mx-1"
              onMouseEnter={() => setIsTextHovered(true)}
              onMouseLeave={() => setIsTextHovered(false)}
            >
              300 Delegates
              <span
                className={`absolute -bottom-0.5 left-0 w-full h-0.5 bg-red-800 transition-transform duration-300 ${
                  isTextHovered ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </span>
            United in Pursuit of Diplomatic Excellence and Transformative
            Leadership.
          </p>

          {/* Animated CTA button with fixed hover animation */}
          <a href="https://www.w3schools.com/">
            <div
              className={`mt-10 transition-all duration-1000 delay-1100 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link to="/registration">
                <button
                  className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3 px-8 rounded-lg flex items-center space-x-2 shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden"
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  {/* Complete hover overlay that fully animates */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                  {/* Button content */}
                  <span className="relative z-10">Donate Now</span>
                  <ChevronRight
                    size={20}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />

                  {/* Decorative elements */}
                  {/* <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-800 rounded-full opacity-70"></span> */}

                  {/* Ripple effect on hover */}
                  <span
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-20 transition-all duration-700 ease-out ${
                      isButtonHovered ? "w-32 h-32" : "w-0 h-0"
                    }`}
                  ></span>
                </button>
              </Link>
            </div>
          </a>

          {/* Animated stats with icons */}
          <div
            className={`mt-16 flex flex-wrap justify-center gap-4 md:gap-8 transition-all duration-1000 delay-1300 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center px-4 py-2 bg-white bg-opacity-50 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <Calendar size={16} className="text-red-800 mr-2" />
              <span className="text-gray-700">13+ Years of Excellence</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white bg-opacity-50 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <Users size={16} className="text-orange-500 mr-2" />
              <span className="text-gray-700">3500+ Delegates</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white bg-opacity-50 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <Globe size={16} className="text-red-800 mr-2" />
              <span className="text-gray-700">10+ Committees</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes moveContinuously {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, 30px) rotate(90deg);
          }
          50% {
            transform: translate(-10px, 20px) rotate(180deg);
          }
          75% {
            transform: translate(-30px, -20px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translate(50px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translate(50px) rotate(-360deg);
          }
        }

        @keyframes orbitReverse {
          0% {
            transform: rotate(0deg) translate(70px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translate(70px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
