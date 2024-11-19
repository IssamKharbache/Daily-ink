import express from "express";
import { getUserProfile } from "../controllers/userControllers.js";

const router = express.Router();

//profile route
router.post("/get-profile", getUserProfile);

export { router as userRoutes };
