import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/cards/ProfileCard";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  const [studyMode, setStudyMode] = useState("");

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (sortOption) params.sort = sortOption;
      if (studyMode) params.studyMode = studyMode;

      const response = await axios.get(
        "http://localhost:5000/api/partner-profiles",
        { params }
      );
      setPartners(response.data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [searchTerm, sortOption, studyMode]);

  return (
    <section className="py-14 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-10 text-center uppercase tracking-wide"
        >
          Find Your Perfect <span className="text-blue-600">Study Partner</span>
        </motion.h2>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        >
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, subject, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
              <SlidersHorizontal className="text-gray-500" size={18} />
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent focus:outline-none text-sm font-medium text-gray-700"
              >
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
              </select>
            </div>

            <select
              value={studyMode}
              onChange={(e) => setStudyMode(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchPartners}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Partners Grid */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading partners...</p>
        ) : partners.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center"
          >
            {partners.map((partner, i) => (
              <motion.div
                key={partner._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProfileCard partner={partner} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No partners found.</p>
        )}
      </div>
    </section>
  );
};

export default FindPartners;
