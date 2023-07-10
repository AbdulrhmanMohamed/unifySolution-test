import {  Response ,NextFunction} from "express";
import { AuthenticatedRequest } from "./authentication.middleWare";

export const userAccess=async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{

    const userCredintialMatched=req.user?._id==req.params.id;
    if(userCredintialMatched){
        next();
    }
    else{
        return res.status(403).send("YOu Dont have Access To This Todo")
    }
}