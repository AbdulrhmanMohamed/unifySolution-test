import Joi from "joi";
import mongoose from "mongoose";
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export  interface IUser{
    userName:string;
    email:string;
    password:string;
}

export const userSchema=new mongoose.Schema({

    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },

})

userSchema.pre('save',function(){
    
    if(this.isModified('password')){
        this.password=bcrypt.hashSync(this.password,10)
    }

    
})




export const User=mongoose.model('user',userSchema)



export const userValidation=(user:IUser,reqType:string)=>{
    const schema=Joi.object({
        userName:Joi.string().alter({
            post:schema=>schema.required(),
        }),
        email:Joi.string().alter({
            post:schema=>schema.required(),
        }),
        password:Joi.string().alter({
            post:schema=>schema.required(),
        }),
    })
    return schema.tailor(reqType).validate(user)
}

