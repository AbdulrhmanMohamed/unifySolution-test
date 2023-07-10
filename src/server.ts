import  'colors'
import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
// import { DbConnection } from './dbConnection/db.connection'
import { CustomError } from './Custom/CustomError'
import { DbConnection } from './dbConnection/db.connection'
import userRoutes from './routes/userRoutes'
import todoRoutes from './routes/todoRoutes'
dotenv.config({path:path.join(__dirname,'/config/.env')})
const app=express();

// middle Wares 
app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// routes 
app.use(`${process.env.PREFIX_API}/user`,userRoutes)
app.use(`${process.env.PREFIX_API}/todo`,todoRoutes)


// Error Middle Wares
process.on('uncaughtException',(error)=>{
    console.log(`looks like the app is crashed ${error}`.bgRed)
    process.exit(1)
})
process.on('unhandledRejection',(error,promise)=>{
    console.log(`Un handled promise Rejection ${promise}`.bgRed)
})
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