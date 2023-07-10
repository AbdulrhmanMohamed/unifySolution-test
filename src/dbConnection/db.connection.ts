import mongoose from 'mongoose'
import mongose from 'mongoose'

export const DbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL!).then( ()=>{
        console.log('Data Base Connected Successfully'.bgBlue);
        
    }).catch((err)=>{
        console.log(`Failed To Connect To Data Base: ${err.message}`.bgRed)
    })
}