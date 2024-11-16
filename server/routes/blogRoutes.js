import express from "express";
import {
  createBlog,
  getBlogByCategory,
  getLatestBlogs,
  getPopularBlogs,
} from "../controllers/blogControllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = express.Router();

router.post("/create", verifyJWT, createBlog);
router.post("/search", getBlogByCategory);
router.get("/latest", getLatestBlogs);
router.get("/popular", getPopularBlogs);

export { router as blogRoutes };
