import cors from 'cors'
import express from "express"
import authroutes from './routes/auth.js'


const app=express()

const PORT=3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/auth",authroutes)



app.listen(PORT,()=>{
    console.log("Backend is running ")
})