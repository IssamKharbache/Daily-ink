import express from "express";
import {
  createBlog,
  getBlogByCategory,
  getBlogByCategoryCount,
  getLatestBlogs,
  getPopularBlogs,
  latestBlogsCount,
} from "../controllers/blogControllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = express.Router();

router.post("/create", verifyJWT, createBlog);
router.post("/search", getBlogByCategory);
router.post("/latest", getLatestBlogs);
router.get("/popular", getPopularBlogs);
router.post("/all-latest-blogs-count", latestBlogsCount);
router.post("/search-count", getBlogByCategoryCount);

export { router as blogRoutes };
