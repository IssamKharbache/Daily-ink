import express from "express";
import {
  createBlog,
  getBlogByCategory,
  getBlogByCategoryCount,
  getLatestBlogs,
  getPopularBlogs,
  getSingleBlog,
  latestBlogsCount,
  searchBlogs,
  searchBlogsCount,
  searchUsers,
} from "../controllers/blogControllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = express.Router();

//create  blog route
router.post("/create", verifyJWT, createBlog);
//get blog by category route
router.post("/filter", getBlogByCategory);
router.post("/filter-count", getBlogByCategoryCount);
//get latest blogs route
router.post("/latest", getLatestBlogs);
router.post("/all-latest-blogs-count", latestBlogsCount);
//get popular blogs route
router.get("/popular", getPopularBlogs);
//search blogs route
router.post("/search", searchBlogs);
router.post("/search-count", searchBlogsCount);
//get user related to search
router.post("/search-users", searchUsers);
//single blog route
router.post("/get-blog", getSingleBlog);

export { router as blogRoutes };
