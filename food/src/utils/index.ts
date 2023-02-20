import { hash,genSalt } from "bcrypt";
import {verify,sign} from 'jsonwebtoken'
import { APP_SECRET } from "../config";
import { Request } from "express";
import Joi from "joi";
import axios from 'axios'


export async function GenerateSalt(){
    return  await genSalt()
}


export async function GeneratePassword(password:string,salt:string){
    return  await hash(password,salt)
}

export async function GenerateSignature(payload:string | object | Buffer){
    return  sign(payload,APP_SECRET,{expiresIn:'1d'})
  }
  
  export async function FormatData(data:unknown){
      if(data){
          return data
      }
      throw new Error('Data not found')
  }
  
  export async function ValidateSignature(req:Request | any){
      try{
          const signature =req.get('Authorization')
          console.log(signature)
          const payload = verify(signature.split(" ")[1],APP_SECRET)
          req.user = payload
          return true
      }catch(err){
          return false
          
      }
      }

      export const registerSchema = Joi.object().keys({
        email: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      });



export const option = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };
  export async function vendorValidateSignature(req:Request|any){
    try{
        const signature =req.get('Authorization')
        console.log(signature)
        const payload = verify(signature.split(" ")[1],APP_SECRET)
        req.vendor = payload
        return true
    }catch(err){
        return false
        
    }
    }


    export const PublishCustomerEvent = (payload:any)=>{
        axios.post("http://localhost:8000/customer/app-event", {payload})
       }