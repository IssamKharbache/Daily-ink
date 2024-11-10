import express from "express";
import { googleAuth, signIn, signUp } from "../controllers/authControllers.js";

const router = express.Router();

//sign up route
router.post("/sign-up", signUp);
//sign in route
router.post("/sign-in", signIn);
//google auth route
router.post("/google-auth", googleAuth);

export { router as authRoute };
