import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Agenda = () => {
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const agendas = [
    {
      id: 1,
      committee: "Indian Committee",
      title:
        "The State Of Opposition In India: Incompetence Or Suppression In A Polarized Political Landscape?",
      image:
        "https://images.unsplash.com/photo-1603033156166-2ae22eb2b7e2?q=80&w=1964",
      color: "bg-amber-600",
    },
    {
      id: 2,
      committee: "Indian Committee 2",
      title:
        "Legalizing Marijuana In India: A Medicinal Boon Or A Gateway Drug?",
      image:
        "https://images.unsplash.com/photo-1603033156166-2ae22eb2b7e2?q=80&w=1964",
      color: "bg-amber-600",
    },
    {
      id: 3,
      committee: "UN Committee",
      title:
        "Cyber Warfare: A Necessary Defense Tool Or A Threat To Global Peace And Security?",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
      color: "bg-amber-600",
    },
    {
      id: 4,
      committee: "Fun Committee",
      title:
        "Men's Cricket Dominance In India: Fair Focus Or Neglecting Other Sports?",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1494",
      color: "bg-amber-600",
    },
    {
      id: 5,
      committee: "Ecofin Committee",
      title:
        "Investing As A Student: Financial Security Or Risky Drain Of Limited Earnings?",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      color: "bg-amber-600",
    },
  ];

  const handleAgendaClick = (id) => {
    setSelectedAgenda(selectedAgenda === id ? null : id);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-12"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="relative inline-block text-6xl font-bold mb-8">
            <span className="text-gray-100 absolute inset-0 z-0 opacity-60 select-none">
              AGENDAS
            </span>
            <span className="relative z-10">
              <span className="text-red-800">Our </span>
              <span className="text-amber-500">AGENDAS</span>
            </span>
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Explore our comprehensive agendas spanning critical issues in
            politics, health, international relations, sports, and finance.
          </p>
        </motion.div>

        {/* Agendas Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {agendas.map((agenda) => (
            <motion.div
              key={agenda.id}
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform"
            >
              <div className="relative overflow-hidden h-64">
                <div
                  className={`absolute top-4 left-4 ${agenda.color} text-white px-4 py-1 rounded-full z-10 font-semibold shadow-md`}
                >
                  {agenda.committee}
                </div>
                <motion.img
                  src={agenda.image}
                  alt={agenda.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 min-h-[4rem]">
                  {agenda.title}
                </h3>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAgendaClick(agenda.id)}
                  className={`bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center w-full mt-4`}
                >
                  Background Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Expandable Content */}
              {selectedAgenda === agenda.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Background Information:
                    </h4>
                    <p className="text-gray-700">
                      This agenda explores critical perspectives and debates
                      surrounding {agenda.title.toLowerCase()}. Join us for an
                      in-depth discussion on this important topic.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore All Agendas
          </a>
        </motion.div>

        {/* Footer */}
        {/* <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-20 pt-8 border-t border-gray-200 text-center text-gray-600"
            >
              <p>© 2026 Conference Agenda Portal. All rights reserved.</p>
            </motion.footer> */}
      </motion.div>

      {/* Floating back to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Agenda;
