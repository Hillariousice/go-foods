import mongoose, { Schema } from "mongoose";


export interface IVendor{
    name: string;
    restaurantName: string;
    pincode:string;
    phone: string;
    address: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable:boolean;
    rating:number;
    role:string;
    coverImage:string
}

 const VendorSchema = new Schema({
    name: String,
    restaurantName: String,
    pincode:String,
    phone: String,
    address: String,
    email: String,
    password: String,
    salt: String,
    serviceAvailable:Boolean,
    rating:Number,
    role:String,
    coverImage:String
 },{
    toJSON:{
        transform(doc, ret){
            delete ret.password,
            delete ret.salt

        }
    },
    timestamps:true
 })


 export const VendorModel = mongoose.model<IVendor>('customer',VendorSchema)