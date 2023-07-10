import Joi from "joi";
import mongoose from "mongoose";
export  interface ITodo{
    title:string;
    description:string;
    status:string;
    user:mongoose.Schema.Types.ObjectId,
}

export const todoSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
        
       },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }

})






export const Todo=mongoose.model('todo',todoSchema)



export const todoValidation=(todo:ITodo,reqType:string)=>{
    const schema=Joi.object({
        title:Joi.string().alter({
            post:schema=>schema.required(),
        }),
        description:Joi.string().alter({
            post:schema=>schema.required(),
        }),
        user:Joi.string().hex().length(24).alter({
            post:schema=>schema.required(),
        }),
        status:Joi.string().valid('inprogress','done','inactive').alter({
            post:schema=>schema.required(),
        })
    })
    return schema.tailor(reqType).validate(todo)
}

