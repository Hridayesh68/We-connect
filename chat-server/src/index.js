import express from "express";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js"
import cors from "cors";
import dotenv from "dotenv";
import { app, server } from "./lib/socket.js";
dotenv.config()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://we-connect-three.vercel.app",
    "https://we-connect-git-main-hridayesh-debsarmas-projects.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});

const PORT=process.env.PORT;
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
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