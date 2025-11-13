import PartnerProfile from "../models/PartnerProfile.js";

export const createPartnerProfile = async (req, res) => {
  try {
    // 🔹 Firebase middleware থেকে user info
    const { email: userEmail, uid: userUid, picture: firebasePhoto } = req.user;

    // 🔹 React ফর্ম থেকে আসা data
    const {
      name,
      profileimage, // React থেকে আসতে পারে, নাও আসতে পারে
      subject,
      studyMode,
      availability, // React form field
      location,
      experienceLevel,
      rating,
    } = req.body;

    // 🔹 Check if profile already exists for this user
    const existingProfile = await PartnerProfile.findOne({ userUid });
    if (existingProfile) {
      return res.status(400).json({ message: "Your profile already exists" });
    }

    // 🔹 যদি React থেকে image না আসে → Firebase profile picture নেবে
    const finalProfileImage =
      profileimage && profileimage.trim() !== "" ? profileimage : firebasePhoto;

    // 🔹 নতুন profile তৈরি
    const profile = new PartnerProfile({
      name,
      profileImage: finalProfileImage,
      subject,
      studyMode,
      availabilityTime: availability,
      location,
      experienceLevel,
      rating: rating || 0, // default 0
      email: userEmail,
      userUid,
      connectionsCount: 0,
    });

    await profile.save();

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getPartnerProfiles = async (req, res) => {
  try {
    const profiles = await PartnerProfile.find();
    res.status(200).json({ profiles });
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPartnerProfile = async (req, res) => {
  try {
    const profile = await PartnerProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ profile });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getTopThreePartnerProfiles = async (req, res) => {
  try {
    const topThreeProfiles = await PartnerProfile.find().sort({ rating: -1 }).limit(3);
    res.status(200).json({ topThreeProfiles });
  } catch (err) {
    console.error("Error fetching top three partner profiles:", err);
    res.status(500).json({ message: "Server error" });
  }
};
