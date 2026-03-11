import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';

import { User } from '../models/User.js'

const users=[]
export async function  signup(req,res){
     try{
        const {username,password}=req.body
        const exists = await User.findOne({ username })

        if (exists){
            return res.status(400).json({message:"Users already exists"})
        }
       const hashed=await bcrypt.hash(password,10)
       const newUser = new User({ username, password: hashed })
       await newUser.save()
       res.status(201).json({message:"User created"})
    }

catch(err){
 res.status(500).json({message:"Signup failed",error:err.message})
}
    }

export async function login(req,res){
    try{
        const {username,password}=req.body
        const user = await User.findOne({ username })

        if (!user){
            return res.status(400).json({message:"User doesn't exists please signup"})
        }

        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).json({message:"Wrong Password"})

        }

        const token=jwt.sign({username:username},"afdfds",{expiresIn:"1h"})
         res.cookie("jwt", token, {
            httpOnly: true,              
            sameSite: "none",           
            maxAge: 60 * 60 * 1000        
        });
        
        res.status(200).json({ message: "Login successful" });


    }
   catch(err){
    res.status(500).json({message:"Login Failed",error:err.message})

   } 
}


export const verify = (req, res) => {

  res.status(200).json({
    user: req.user
  });

};