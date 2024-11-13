import express from "express";
import { createBlog } from "../controllers/blogControllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = express.Router();

router.post("/create", verifyJWT, createBlog);

export { router as blogRoutes };
