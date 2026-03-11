import cors from 'cors'
import express from "express"
import authroutes from './routes/auth.js'
import connectDB from './db.js'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";


dotenv.config();
connectDB()

const app=express()

const PORT=4000
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://forums-self.vercel.app"
  ],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/auth",authroutes)

app.get("/",(req,res)=>{
    res.send("forums backend is active")
})



app.listen(PORT,()=>{
    console.log("Backend is running ")
})