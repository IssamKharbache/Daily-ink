import express from "express";
import { uploadBlogBanner } from "../controllers/uploadControllers.js";

const router = express.Router();

router.post("/upload-banner", uploadBlogBanner);

export { router as uploadRoute };
