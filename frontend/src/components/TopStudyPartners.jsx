import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "./cards/ProfileCard";

const TopStudyPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPartners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/partner-profiles/top-three");
        // ✅ Response shape: { topThreeProfiles: [ ... ] }
        setPartners(response.data.topThreeProfiles || []);
      } catch (error) {
        console.error("Error fetching top partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPartners();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-20 text-center uppercase">
          Top Study Partners
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {loading ? (
            <p className="text-gray-500 text-center">Loading top partners...</p>
          ) : partners.length > 0 ? (
            partners.map((partner) => (
              <ProfileCard key={partner._id} partner={partner} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No top partners found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopStudyPartners;
