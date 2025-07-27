import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const users=[]
export async function  signup(req,res){
     try{
        const {username,password}=req.body
        const exists=users.find(u=>u.username===username)
        if (exists){
            return res.status(400).json({message:"Users already exists"})
        }
       const hashed=await bcrypt.hash(password,10)
       users.push({username,password:hashed});
       res.status(201).json({message:"User created"})
    }

catch(err){
 res.status(500).json({message:"Signup failed",error:err.message})
}
    }

export async function login(req,res){
    try{
        const {username,password}=req.body
        const user=users.find(u=> u.username===username)
        if (!user){
            return res.status(400).json({message:"User doesn't exists please signup"})
        }

        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).json({message:"Wrong Password"})

        }

        const token=jwt.sign({username:username},"afdfds",{expiresIn:"1h"})
        console.log(token)
        res.json({token});

    }
   catch(err){
    res.status(500).json({message:"Login Failed",error:err.message})

   } 
}