import React from "react";

const ContactUsCard = ({ title, description1, description2, lucidIcon: LucidIcon }) => {
  return (
    <div className="p-6 md:p-8 bg-white shadow-sm border border-[#D4C5A9] rounded-2xl flex flex-col items-center text-center space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 bg-[#F0F7F4] rounded-xl flex items-center justify-center">
        <LucidIcon className="w-7 h-7 text-[#2D6A4F]" />
      </div>
      <h3 className="text-[#2D6A4F] text-lg font-bold">{title}</h3>
      <div>
        <p className="text-[#6B5C45] text-sm">{description1}</p>
        <p className="text-[#6B5C45] text-sm">{description2}</p>
      </div>
    </div>
  );
};

export default ContactUsCard;
