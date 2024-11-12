import { nanoid } from "nanoid";
import cloudinary from "../cloudinary.js";
import multer from "multer";

// Set up multer to handle file upload (in-memory storage)
const storage = multer.memoryStorage(); // Files will be stored in memory as buffers
const upload = multer({ storage }).single("file"); // 'file' corresponds to the field name in FormData

export const uploadBlogBanner = async (req, res) => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}.jpeg`;
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }

    try {
      const { file } = req; // Get the uploaded file from the request (Multer parses it)

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload file buffer to Cloudinary
      const uploadResult = await cloudinary.uploader.upload_stream(
        {
          upload_preset: process.env.CLOUDINARY_PRESETNAME, // Cloudinary preset
          allowed_formats: ["png", "jpg", "jpeg"], // Allowed file formats
          public_id: imageName, // Public ID for the uploaded file
        },
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "Error uploading to Cloudinary" });
          }
          return res.status(200).json(result); // Return the result from Cloudinary
        }
      );

      // Pipe the file buffer to Cloudinary
      uploadResult.end(file.buffer); // Pass the file buffer to Cloudinary's upload stream
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
