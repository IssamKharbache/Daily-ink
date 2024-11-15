import express from "express";
import { createBlog, getLatestBlogs } from "../controllers/blogControllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = express.Router();

router.post("/create", verifyJWT, createBlog);
router.get("/latest", getLatestBlogs);

export { router as blogRoutes };
