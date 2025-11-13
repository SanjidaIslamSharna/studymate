import express from "express";
import firebaseAuth from "../middleware/firebaseAuth.js";
import { 
    sendPartnerRequest, 
    createPartnerProfile, 
    getPartnerProfiles, 
    getTopThreePartnerProfiles, 
    getPartnerProfile 
} from "../controllers/partnerProfileController.js";

const router = express.Router();

router.post("/create", firebaseAuth, createPartnerProfile);
router.get("/", getPartnerProfiles);
router.get("/top-three", getTopThreePartnerProfiles);
router.get("/:id", getPartnerProfile);
router.post("/:id/send-request", firebaseAuth, sendPartnerRequest);
export default router;
