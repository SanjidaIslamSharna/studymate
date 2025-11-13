import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyConnections = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:5000/api/connections", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConnections(res.data.connections || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchConnections();
  }, [user]);

  const handleDelete = async (partnerId) => {
    if (!window.confirm("Are you sure you want to delete this connection?")) return;

    try {
      const token = await user.getIdToken();
      await axios.delete(`http://localhost:5000/api/connections/${partnerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConnections(prev => prev.filter(c => c._id !== partnerId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">My Connections</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : connections.length === 0 ? (
          <p className="text-center text-gray-500">No connections found.</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Profile</th>
                <th className="py-2 px-4 text-left">Subject</th>
                <th className="py-2 px-4 text-left">Study Mode</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((partner) => (
                <tr key={partner._id} className="border-b">
                  <td className="py-2 px-4 flex items-center gap-2">
                    <img
                      src={partner.profileImage}
                      alt={partner.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{partner.name}</span>
                  </td>
                  <td className="py-2 px-4">{partner.subject}</td>
                  <td className="py-2 px-4">{partner.studyMode}</td>
                  <td className="py-2 px-4 flex gap-2 justify-center">
                    <Link to={`/partner/${partner._id}`}>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(partner._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default MyConnections;
