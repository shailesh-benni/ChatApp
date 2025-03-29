import express from "express";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.routes.js";
import messageRoutes from "../routes/message.routes.js";
import cors from "cors";

import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";



const app =express();


dotenv.config()

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB();
});
