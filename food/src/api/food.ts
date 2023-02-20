import  FoodService  from "../services/food-service";
import express, { NextFunction,Request,Response } from 'express'
import vendorAuth from "./middleware/auth";
import { v4 as uuidv4 } from "uuid";
import { PublishCustomerEvent } from "../utils";

export const Food = (app:express.Application)=>{

    const service = new FoodService()

    app.post('/food/create-food',vendorAuth, async(req:Request,res:Response,next:NextFunction)=>{
        const foodid = uuidv4()
try{
    const {id,name,
        description,
        category,
        foodType,
        readyTime,
        price,
        rating,
        image,vendorId} =req.body


    const data = await service.addFood({id:foodid,name,
        description,
        category,
        foodType,
        readyTime,
        price,
        rating,
        image,vendorId})

  

    return res.status(201).json(data)

}catch(err){
    next(err)
}

    })

    app.put('/cart',vendorAuth, async(req: Request | any, res: Response, next: NextFunction)=>{
        const {_id} = req.user
        const data:any= await service.GetFoodPayload(_id,{productId:req.body._id, qty:req.body.qty},"ADD_TO_CART")
        PublishCustomerEvent(JSON.stringify(data))
        res.status(200).json(data.data.product)
          })
}