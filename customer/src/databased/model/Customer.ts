import mongoose, { Schema } from "mongoose";


export interface ICustomers{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    salt: string;
    address: string;
    phone: string;
    otp: number;
    otp_expiry: Date;
    lng: number;
    lat: number;
    verified: boolean;
    role:string;
    cart:Array<object>
}

 const CustomerSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    salt: String,
    address: String,
    phone: String,
    otp: Number,
    otp_expiry: Date,
    lng: Number,
    lat: Number,
    verified: Boolean,
    role:String,
    cart:[{
        product:{
            _id:{type:String},
            name:{type:String},
            banner:{type:String},
            price:{type:String},
            
        },
        unit:{type:Number,require:true}
       }]
 },{
    toJSON:{
        transform(doc, ret){
            delete ret.password,
            delete ret.salt

        }
    },
    timestamps:true
 })


 export const CustomerModel = mongoose.model<ICustomers>('customer',CustomerSchema)