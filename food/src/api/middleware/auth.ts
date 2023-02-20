import {vendorValidateSignature} from '../../utils'
import { Request,Response,NextFunction } from 'express'

const vendorAuth = async(req:Request,res:Response,next:NextFunction)=>{
    const isAuthorized = await vendorValidateSignature(req)
    if(isAuthorized){
        return next()
    }
    return res.status(403).json({
        Error: "Not Authorized!!"
    })
}


export default vendorAuth