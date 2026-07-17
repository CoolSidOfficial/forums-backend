import cors from 'cors'
import express from "express"
import authroutes from './routes/auth.js'
import postRoutes from "./routes/postRoutes.js";

import connectDB from './db.js'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
connectDB()

const app=express()

const PORT=process.env.PORT || 4000
app.use(cookieParser());
app.use(cors({
origin: ["https://forums-self.vercel.app","http://localhost:3000"],

  credentials: true
}));


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/auth",authroutes)
app.use("/api",postRoutes)
app.use("/api/product", productRoutes);
app.get("/",(req,res)=>{
    res.send("forums backend is active")
})
app.use("/api", commentRoutes);



app.listen(PORT,"0.0.0.0",()=>{
    console.log("Backend is running ")
})