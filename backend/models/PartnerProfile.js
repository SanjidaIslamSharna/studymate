import mongoose from "mongoose";

const partnerProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: { type: String },
  subject: { type: String, required: true },
  studyMode: { type: String, enum: ["Online", "Offline"], required: true },
  availabilityTime: { type: String, required: true },
  location: { type: String },
  experienceLevel: { type: String, enum: ["Beginner", "Intermediate", "Expert"], required: true },
  rating: { type: Number, default: 0 },
  partnerCount: { type: Number, default: 0 },
  connections: { type: [String], default: [] },
  email: { type: String, required: true },
  userUid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PartnerProfile = mongoose.model("PartnerProfile", partnerProfileSchema);
export default PartnerProfile;
