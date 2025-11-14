import React, { useState } from "react";
import { getAuth } from "firebase/auth"; // Firebase Auth
import axios from "axios";
import toast from "react-hot-toast";

const CreatePartner = () => {
  const auth = getAuth();
  const user = auth.currentUser; // Logged-in user
  const apiUrl = import.meta.env.VITE_API_URL;


  // Form state
  const [formData, setFormData] = useState({
    name: "",
    profileimage: "",
    subject: "",
    studyMode: "",
    availability: "",
    location: "",
    experienceLevel: "",
    rating: "",
  });

  // Created profile state (for instant UI update)
  const [createdProfile, setCreatedProfile] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create a profile!");
      return;
    }

    try {
      // Get Firebase token
      const token = await user.getIdToken();

      const newProfile = {
        ...formData,
        email: user.email,
        partnerCount: 0,
      };

      // Send POST request to backend
      const res = await axios.post(
        `${apiUrl}/partner-profiles/create`,
        newProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Success toast
      toast.success(res.data.message);

      // Update UI with created profile
      setCreatedProfile(res.data.profile);

      // Reset form
      setFormData({
        name: "",
        profileimage: "",
        subject: "",
        studyMode: "",
        availability: "",
        location: "",
        experienceLevel: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create profile");
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-10 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center uppercase">
          Create a Study Partner Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block font-semibold mb-1">Profile Image URL</label>
            <input
              type="text"
              name="profileimage"
              value={formData.profileimage}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="e.g., Math, English, Programming"
            />
          </div>

          {/* Study Mode */}
          <div>
            <label className="block font-semibold mb-1">Study Mode</label>
            <select
              name="studyMode"
              value={formData.studyMode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block font-semibold mb-1">Availability Time</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="e.g., Evening 6–9 PM"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="City or Area"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block font-semibold mb-1">Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block font-semibold mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="0 - 5"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
            >
              Create Profile
            </button>
          </div>
        </form>

        {/* Display Created Profile */}
        {createdProfile && (
          <div className="mt-8 p-6 bg-green-50 border border-green-300 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Profile Created:</h3>
            <p><strong>Name:</strong> {createdProfile.name}</p>
            <p><strong>Email:</strong> {createdProfile.email}</p>
            <p><strong>Subject:</strong> {createdProfile.subject}</p>
            <p><strong>Study Mode:</strong> {createdProfile.studyMode}</p>
            <p><strong>Availability:</strong> {createdProfile.availability}</p>
            <p><strong>Location:</strong> {createdProfile.location}</p>
            <p><strong>Experience:</strong> {createdProfile.experienceLevel}</p>
            <p><strong>Rating:</strong> {createdProfile.rating}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatePartner;
