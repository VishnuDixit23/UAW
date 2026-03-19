import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const roleIcons = {
  "Founder": "🌱",
  "Secretary": "📋",
  "Vice President": "🤝",
  "Treasurer": "💼",
  "India Head": "🇮🇳",
  "Fundraising Head": "❤️",
  "Senior Coordinator": "⭐",
};

const TeamSection = ({ teamData }) => {
  const teams = teamData || [];
  const primaryColor = "#2D6A4F";

  return (
    <div className="w-full py-4 max-w-5xl mx-auto px-4">
      {teams.map((team, teamIndex) => (
        <div key={teamIndex} className="mb-16">
          {/* Team Title */}
          <div className="text-center mb-10">
            <span className="text-[#D4A056] font-semibold tracking-widest text-sm uppercase">
              {team.title}
            </span>
            <div className="h-0.5 w-16 bg-[#D4A056] mx-auto mt-2" />
          </div>

          {/* Members Grid */}
          <div className="flex flex-wrap justify-center gap-8">
            {team.members.map((member, memberIndex) => (
              <div
                key={memberIndex}
                className="bg-white rounded-2xl shadow-sm border border-[#D4C5A9] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 w-64"
              >
                {/* Photo */}
                <div className="relative w-full h-60 bg-[#F0F7F4] flex items-center justify-center overflow-hidden">
                  {member.image && member.image !== "" ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  {/* Fallback avatar */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#2D6A4F] to-[#52B788]"
                    style={{ display: member.image ? "none" : "flex" }}
                    id={`fallback-${teamIndex}-${memberIndex}`}
                  >
                    <span className="text-5xl mb-2">
                      {roleIcons[member.designation] || "🐾"}
                    </span>
                    <span className="text-white font-bold text-xl">
                      {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <h3 className="font-bold text-[#2D6A4F] text-base leading-tight">
                        {member.name}
                      </h3>
                      <span className="inline-block mt-1 text-xs font-semibold bg-[#F0F7F4] text-[#2D6A4F] px-2 py-0.5 rounded-full border border-[#D4C5A9]">
                        {member.designation}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      {member.linkedin && member.linkedin !== "" && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 bg-[#2D6A4F] hover:bg-[#1B4332] rounded-full flex items-center justify-center transition-colors"
                        >
                          <FaLinkedinIn className="w-3 h-3 text-white" />
                        </a>
                      )}
                      {member.instagram && member.instagram !== "" && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 bg-[#D4A056] hover:bg-[#A0722A] rounded-full flex items-center justify-center transition-colors"
                        >
                          <FaInstagram className="w-3 h-3 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSection;
