import express from "express";
import {
  createBlog,
  getLatestBlogs,
  getPopularBlogs,
} from "../controllers/blogControllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = express.Router();

router.post("/create", verifyJWT, createBlog);
router.get("/latest", getLatestBlogs);
router.get("/popular", getPopularBlogs);

export { router as blogRoutes };
