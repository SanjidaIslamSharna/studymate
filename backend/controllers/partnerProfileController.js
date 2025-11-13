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

// export const getPartnerProfiles = async (req, res) => {
//   try {
//     const profiles = await PartnerProfile.find();
//     res.status(200).json({ profiles });
//   } catch (err) {
//     console.error("Error fetching profiles:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

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

export const getPartnerProfiles = async (req, res) => {
  try {
    const { search, sort, studyMode } = req.query;
    let query = {};

    // Search filter
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { name: regex },
        { subject: regex },
        { location: regex }
      ];
    }

    // Study mode filter
    if (studyMode) {
      query.studyMode = studyMode;
    }

    // Sorting
    let profilesQuery = PartnerProfile.find(query);
    if (sort === "rating") profilesQuery = profilesQuery.sort({ rating: -1 });

    const profiles = await profilesQuery.exec();
    res.status(200).json(profiles);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Send Partner Request
export const sendPartnerRequest = async (req, res) => {
  try {
    const { id } = req.params; // PartnerProfile ID
    const currentUserUid = req.user.uid;

    const partner = await PartnerProfile.findById(id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    // Already connected?
    if (partner.connections.includes(currentUserUid)) {
      return res.status(400).json({ message: "You already sent a request" });
    }

    // Add to connections & increment partnerCount
    partner.connections.push(currentUserUid);
    partner.partnerCount = partner.connections.length;

    await partner.save();

    res.status(200).json({ message: "Partner request sent", partner });
  } catch (err) {
    console.error("Error sending request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyConnections = async (req, res) => {
  try {
    const userUid = req.user.uid; // Logged-in user UID

    // Find all profiles where connections include this user
    const connections = await PartnerProfile.find({
      connections: userUid
    });

    res.status(200).json({ connections });
  } catch (err) {
    console.error("Error fetching connections:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteConnection = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const userUid = req.user.uid;

    const partner = await PartnerProfile.findById(partnerId);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    partner.connections = partner.connections.filter(uid => uid !== userUid);
    partner.partnerCount = partner.connections.length;

    await partner.save();
    res.status(200).json({ message: "Connection deleted successfully" });
  } catch (err) {
    console.error("Error deleting connection:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateConnection = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const updateData = req.body; // e.g., { studyMode, availabilityTime, location, experienceLevel }

    const updatedPartner = await PartnerProfile.findByIdAndUpdate(
      partnerId,
      updateData,
      { new: true }
    );

    if (!updatedPartner) return res.status(404).json({ message: "Partner not found" });

    res.status(200).json({ message: "Connection updated", updatedPartner });
  } catch (err) {
    console.error("Error updating connection:", err);
    res.status(500).json({ message: "Server error" });
  }
};