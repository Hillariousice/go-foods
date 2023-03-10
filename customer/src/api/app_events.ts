import CustomerService from "../services/customer-service";
import express, {Request,Response,NextFunction} from 'express'




export const appEvent = (app:express.Application)=>{
    const service = new CustomerService()
    app.use("/app-event",(req:Request,res:Response, next:NextFunction)=>{

        const {payload} =req.body

        service.SubscribeEvents(payload)


        console.log(payload)
        console.log("==== Customer service ===")

        res.status(200).json(payload)

    })
}