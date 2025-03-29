import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

// Load environment variables from .env file
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ✅ Corrected
  api_key: process.env.CLOUDINARY_API_KEY, // ✅ Corrected
  api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ Corrected
});

export default cloudinary;
