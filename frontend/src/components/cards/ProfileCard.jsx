import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProfileCard = ({ partner }) => {

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full sm:w-72 p-5 flex flex-col items-center">
      {/* Profile Image */}
      <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white -mt-12 bg-gray-100">
        <img
          src={partner.profileImage || "https://via.placeholder.com/150"}
          alt={partner.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="mt-4 text-center space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">
          {partner.name}
        </h2>
        <p className="text-sm text-gray-500 font-medium">{partner.subject}</p>
        <p className="text-xs text-gray-400">{partner.studyMode}</p>
      </div>

      {/* Ratings */}
      <div className="flex items-center justify-center gap-1 mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={`${
              i < Math.round(partner.rating || 0)
                ? "text-yellow-400"
                : "text-gray-300"
            } text-sm`}
          />
        ))}
        <span className="text-gray-600 text-sm ml-1 font-medium">
          {partner.rating?.toFixed(1) || "0.0"}
        </span>
      </div>

      {/* Location & Experience */}
      <div className="mt-3 text-center text-gray-500 text-sm">
        <p>{partner.location}</p>
        <p className="italic">{partner.experienceLevel}</p>
      </div>

      {/* Button */}
      <Link
        to={`/partner/${partner._id}`}
        className="mt-5 px-6 py-2.5 bg-gradient-to-r from-[#ffaf58] to-[#F88813] text-white rounded-full font-medium shadow-md hover:from-[#ffaf58] hover:to-[#F88813] transform hover:scale-105 transition-all duration-200"
      >
        View Profile
      </Link>
    </div>
  );
};

export default ProfileCard;
