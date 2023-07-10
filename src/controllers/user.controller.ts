import { asyncHandler } from "../middleWares/asyncHandler";
import {Request,Response} from 'express'
import { User } from "../models/user.model";
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const singUp=asyncHandler(async(req:Request,res:Response)=>{
   const userExist=await User.findOne({email:req.body.eamil})
   if(userExist){
    return res.status(400).send("user Already Exist")
   }else{

       const user= new User({...req.body});

       await user.save();
       res.status(201).send({message:"User Created Successfully",user})
   }
    
})

export const login=asyncHandler(async(req:Request,res:Response)=>{
    const isUserExist=await User.findOne({email:req.body.email})
    if(isUserExist){
        const isPasswordMatch=bcrypt.compareSync(req.body.password,isUserExist.password)
        if(isPasswordMatch){
            // loged in successfully
            const token=jwt.sign({_id:isUserExist._id,email:isUserExist.email},process.env.SECRET!)
            return res.status(200).send({message:'user loged successfully',token})
        }else{
            return res.status(400).send("Invalid Email or Password")
        }
    }else{
        return res.status(400).send("Invalid Email or Password")
    }
})