import express from "express";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js"
import dotenv from "dotenv";
dotenv.config()
const app=express();
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
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`);
            console.log(`the address of the port is http://localhost:${PORT}`);
        })
    }
    catch(error){
        console.log(error);
    }
}
startserver();