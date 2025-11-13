import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firebaseAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // 🔹 Firebase user info fetch (to get photoURL)
    const userRecord = await admin.auth().getUser(decodedToken.uid);

    // 🔹 Attach custom user data to req.user
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      picture: userRecord.photoURL || "", // fallback if not set
      name: userRecord.displayName || "",
    };

    next();
  } catch (err) {
    console.error("Firebase Auth Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default firebaseAuth;
