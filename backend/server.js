import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import partnerProfileRoutes from "./routes/partnerProfileRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";

dotenv.config();

const app = express();

// --- CORS CONFIG (100% Working) ---
app.use(
  cors({
    origin: [
      "https://studymate-red.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight FIX (Render problem fix)
app.options("*", cors());

// Extra header fix (to avoid browser block)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://studymate-red.vercel.app");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(express.json());

// Connect to DB
connectDB();

app.get("/", (req, res) => {
  res.send("StudyMate API is running...");
});

// Routes
app.use("/api/partner-profiles", partnerProfileRoutes);
app.use("/api/connections", connectionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
