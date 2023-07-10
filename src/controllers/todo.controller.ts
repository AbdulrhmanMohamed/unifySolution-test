import { Request, Response } from "express";
import { asyncHandler } from "../middleWares/asyncHandler";
import {Todo } from "../models/todo.model";
import { AuthenticatedRequest } from "../middleWares/authentication.middleWare";
import { checUserAccess } from "../helper/checkUserAccess";

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const todoExist = await Todo.findOne({
    title: req.body.title,
    user: req.body.user,
  });

  if (todoExist) {
    return res.status(400).send({ message: "Todo Already Exist" });
  } else {
    const todo = new Todo({ ...req.body });
    await todo.save();
    return res.status(201).send({ message: "tood Created Successfully", todo });
  }
});

export const getTodoInfo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    return res.status(200).send({ message: "todo Fetched Successfully", todo });
  } else {
    return res.status(400).send({ message: "todos Not Found" });
  }
});

export const updateTodo = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const todoExist: any = await Todo.findOne({ _id: req.params.id });
    if (checUserAccess(req.user?._id.toString(),todoExist? todoExist.user.toString():'')) {
      if (req.body.user) {
        return res.status(400).send("Cant Update User For Todo");
      }
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      if (todo) {
        return res
          .status(200)
          .send({ message: "todo updated Successfully", todo });
      } else {
        return res.status(400).send({ message: "todos Not Found" });
      }
    } else {
      return res
        .status(403)
        .send("Cant Update This Todo , cause You dont have access");
    }
  }
);

export const deleteTodo = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const todoExist: any = await Todo.findOne({ _id: req.params.id });
    if (checUserAccess(req.user?._id.toString(),todoExist? todoExist.user.toString():'')) {
      
      const todo = await Todo.findByIdAndDelete(
        req.params.id,
       
      );
      if (todo) {
        return res
          .status(200)
          .send({ message: "todo Deleted Successfully", todo });
      } else {
        return res.status(400).send({ message: "todos Not Found" });
      }
    } else {
      return res
        .status(403)
        .send("Cant Delete This Todo , cause You dont have access");
    }
  }
);

export const getAllTodos = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    console.log("get AllTodos");
    const todos = await Todo.find({ user: req.user?._id });
    if (todos[0]) {
      return res
        .status(200)
        .send({ message: "todos fetched Successfully", todos });
    } else {
      return res.status(400).send({ message: "todos Not Found" });
    }
  }
);
