import  'colors'
import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { DbConnection } from './dbConnection/db.connection'
import { CustomError } from './Custom/CustomError'
dotenv.config({path:path.join(__dirname,'/config/.env')})
const app=express();

// middle Wares 
app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// Error Middle Wares
app.all('*',(req:Request,res:Response,next:NextFunction)=>{
    const error=new CustomError(`un Handled Route : ${req.originalUrl}`,400)

    next(error)
})

// global error handler
app.use((error:CustomError,req:Request,res:Response)=>{
    return res.status(error.statusCode || 500).send(error)
})
const port=process.env.PORT ||3000;
app.listen(port, ()=>{
    console.log(`listening on Port ${port}`.bgGreen)
    DbConnection();
})