import { Request, Response } from "express";
import { asyncHandler } from "../middleWares/asyncHandler";
import { Todo } from "../models/todo.model";

export const createTodo=asyncHandler(async(req:Request,res:Response)=>{

    
    const todoExist=await Todo.findOne({title:req.body.title})
    if(todoExist){
        return res.status(200).send({message:"Todo Already Exist"})
    }else{
        const todo=new Todo({...req.body})
        await todo.save();
    }
})


export const getTodoInfo=asyncHandler(async(req:Request,res:Response)=>{

    
  const todo=await Todo.findById(req.params.id)
  if(todo){
    return res.status(200).send({message:"todo Fetched Successfully",todo})
  }else{
    return res.status(400).send({message:"todos Not Found"})
  }
})


export const updateTodo=asyncHandler(async(req:Request,res:Response)=>{

    
    if(req.body.user){
        return res.status(400).send("Cant Update User For Todo")
    }
    const todo=await Todo.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    if(todo){
      return res.status(200).send({message:"todo updated Successfully",todo})
    }else{
      return res.status(400).send({message:"todos Not Found"})
    }
  })


  export const deleteTodo=asyncHandler(async(req:Request,res:Response)=>{

    
    const todo=await Todo.findByIdAndDelete(req.params.id)
    if(todo){
      return res.status(200).send({message:"todo deleted Successfully",todo})
    }else{
      return res.status(400).send({message:"todo Not Found"})
    }
  })


  export const getAllTodos=asyncHandler(async(req:Request,res:Response)=>{

    
    const todos=await Todo.find({user:req.params.id})
    if(todos[0]){
      return res.status(200).send({message:"todos fetched Successfully",todos})
    }else{
      return res.status(400).send({message:"todos Not Found"})
    }
  })

