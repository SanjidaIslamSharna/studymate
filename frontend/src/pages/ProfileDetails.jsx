import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProfileDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false); // Already connected?

  const apiUrl = import.meta.env.VITE_API_URL;;

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/partner-profiles/${id}`);
        setPartner(response.data.profile);

        // Check if current user is already connected
        if (user && response.data.profile.connections?.includes(user.uid)) {
          setConnected(true);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [id, user]);

  const handleSendRequest = async () => {
    if (!user) {
      toast.error("You must be logged in to send a request!");
      return;
    }

    try {
      const token = await user.getIdToken(); // Firebase token
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/partner-profiles/${id}/send-request`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      setConnected(true); // hide button
      setPartner((prev) => ({
        ...prev,
        connections: [...(prev.connections || []), user.uid],
        partnerCount: prev.partnerCount + 1,
      }));
    } catch (err) {
      console.error("Error sending request:", err);
      toast.error(err.response?.data?.message || "Failed to send request");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg font-medium">
        Loading profile...
      </p>
    );

  if (!partner)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Partner not found
      </p>
    );

  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto max-h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300">
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={partner.profileImage || "https://via.placeholder.com/600x400"}
            alt={partner.name}
            className="w-full h-[300px] md:h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {partner.name}
            </h2>
            <p className="text-lg text-blue-600 font-medium mb-4">{partner.subject}</p>
            <div className="space-y-3 text-gray-600">
              <p><strong>Study Mode:</strong> {partner.studyMode || "N/A"}</p>
              <p><strong>Availability:</strong> {partner.availabilityTime || "N/A"}</p>
              <p><strong>Location:</strong> {partner.location || "N/A"}</p>
              <p><strong>Experience:</strong> {partner.experienceLevel || "N/A"}</p>
              <p><strong>Rating:</strong> {partner.rating ? `${partner.rating}⭐` : "Not rated"}</p>
              <p><strong>Partner Count:</strong> {partner.partnerCount || 0}</p>
            </div>
          </div>

          {/* Send Request Button */}
          {!connected && (
            <div className="mt-8">
              <button
                onClick={handleSendRequest}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
              >
                Send Partner Request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
