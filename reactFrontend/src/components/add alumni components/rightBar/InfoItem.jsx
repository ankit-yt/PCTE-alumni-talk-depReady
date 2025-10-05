import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-1 group">
    
    <span className="text-red-500 text-lg transition-transform duration-300 group-hover:scale-110">
      {icon}
    </span>

    <span className="text-gray-800 dark:text-gray-100 text-sm">
      <strong className="font-semibold text-gray-900 ">
        {label}:
      </strong>{" "}
      <span className="text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-300">
        {value}
      </span>
    </span>
  </div>
);

export default InfoItem;
