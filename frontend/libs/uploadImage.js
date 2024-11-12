import axios from "axios";

export const uploadImage = async (file) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const formData = new FormData();
  formData.append("file", file); // Add the file to FormData
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESETNAME); // Cloudinary preset

  try {
    const response = await axios.post(
      `${backendUrl}/api/images/upload-banner`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Telling the server we're sending a file
        },
      }
    );

    return response.data.secure_url; // Return Cloudinary's secure URL for the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
};
