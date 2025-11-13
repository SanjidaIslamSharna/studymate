import express from "express";
import {
  getMyConnections,
  deleteConnection,
  updateConnection
} from "../controllers/partnerProfileController.js";
import firebaseAuth from "../middleware/firebaseAuth.js";

const router = express.Router();

router.get("/", firebaseAuth, getMyConnections);
router.delete("/:partnerId", firebaseAuth, deleteConnection);
router.put("/:partnerId", firebaseAuth, updateConnection);

export default router;