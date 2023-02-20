import mongoose from "mongoose";
import { DB_URL } from "../config";


export const dbConnection = async()=>{
    try{
        mongoose.set('strictQuery',false)
        mongoose.connect(DB_URL)
        console.log('Database connected')

    }catch(err){
        console.log(err)
        console.log('Error ====')
        process.exit(1)
    }
}