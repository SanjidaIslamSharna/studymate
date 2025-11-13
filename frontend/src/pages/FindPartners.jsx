import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "./cards/ProfileCard";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  const [studyMode, setStudyMode] = useState(""); // Online / Offline / ""

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (sortOption) params.sort = sortOption;
      if (studyMode) params.studyMode = studyMode;

      const response = await axios.get("http://localhost:5000/api/partner-profiles", { params });
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch partners whenever filters change
  useEffect(() => {
    fetchPartners();
  }, [searchTerm, sortOption, studyMode]);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center uppercase">
          Find Study Partners
        </h2>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name, subject, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
          </select>

          <select
            value={studyMode}
            onChange={(e) => setStudyMode(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Study Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Partners Grid */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading partners...</p>
        ) : partners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {partners.map((partner) => (
              <ProfileCard key={partner._id} partner={partner} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No partners found.</p>
        )}
      </div>
    </section>
  );
};

export default FindPartners;
