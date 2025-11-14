// firebaseAuth.js
import admin from "firebase-admin";

// 🔹 Step 1: Environment Variable থেকে Firebase service account JSON parse
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// 🔹 Step 2: Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// 🔹 Step 3: Firebase Auth middleware
const firebaseAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    // Firebase ID token verify
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Optional: fetch user info (like photoURL, displayName)
    const userRecord = await admin.auth().getUser(decodedToken.uid);

    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      picture: userRecord.photoURL || "",
      name: userRecord.displayName || "",
    };

    next();
  } catch (err) {
    console.error("Firebase Auth Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default firebaseAuth;
