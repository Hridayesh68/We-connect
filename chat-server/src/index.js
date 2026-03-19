import express from "express";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js"
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { app, server } from "./lib/socket.js";
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT;
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.get("/", (req, res) => {
  res.send("we connect is running")
})
const startserver=async()=>{
    try{
        await connectDB();
        server.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`);
            console.log(`the address of the port is http://localhost:${PORT}`);
        })
    }
    catch(error){
        console.log(error);
    }
}
startserver();