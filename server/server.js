import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRoute } from "./routes/authRoutes.js";
import cors from "cors";
//initializing modules
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
