import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRoute } from "./routes/authRoutes.js";
import cors from "cors";
import admin from "firebase-admin";
import { uploadRoute } from "./routes/uploadRoutes.js";
import { blogRoutes } from "./routes/blogRoutes.js";

//initializing modules
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN, "base64").toString("utf-8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//connect to db
mongoose
  .connect(process.env.MONGODB_URI, {
    autoIndex: true,
  })
  .then(console.log("connected to mongo db"))
  .catch(console.error);

let PORT = process.env.PORT || 3000;

//authentification routes
app.use("/api/auth", authRoute);
app.use("/api/images", uploadRoute);
//blog routes
app.use("/api/blog", blogRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
