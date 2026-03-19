import { useState } from "react";
import { motion } from "framer-motion";

const Card3DWave = ({
  member,
  cardColor = "#060807",
  accentColor = "#2D6A4F",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div className="flex justify-center">
      <motion.div
        className="relative w-[300px] rounded-xl overflow-hidden shadow-lg bg-white flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-[225px] h-[247px] object-cover rounded-[1%]"
        />
        <div className="p-1 flex flex-col items-center text-center">
          <p
            className="text-lg font-bold uppercase"
            style={{ color: accentColor }}
          >
            {member.name}
          </p>
          <p className="text-sm text-gray-600 mb-2">{member.designation}</p>
          <div className="flex space-x-3">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#2D6A4F] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.872 0-2.158 1.462-2.158 2.97v5.697h-3v-11h2.878v1.496h.041c.401-.761 1.379-1.557 2.835-1.557 3.027 0 3.584 1.996 3.584 4.589v6.472z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card3DWave;
