import  VendorService  from "../services/vendor-service";
import express, { NextFunction,Request,Response } from 'express'
import { option, registerSchema } from "../utils";

export const Vendor = (app:express.Application)=>{

    const service = new VendorService()

    app.post('/vendor/signup',async(req:Request,res:Response,next:NextFunction)=>{
try{
    const {email,phone,password} =req.body

    const validateResult = registerSchema.validate(req.body,option)
    if(validateResult.error){
        return res.status(400).json({
            Error: validateResult.error.details[0].message
        })
    }


    const data = await service.registerVendor({email,password,phone})

  

    return res.status(201).json(data)

}catch(err){
    next(err)
}

    })


}