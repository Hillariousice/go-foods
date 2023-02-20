import {ValidateSignature} from '../../utils'
import { Request,Response,NextFunction } from 'express'

const userAuth = async(req:Request,res:Response,next:NextFunction)=>{
    const isAuthorized = await ValidateSignature(req)
    if(isAuthorized){
        return next()
    }
    return res.status(403).json({
        Error: "Not Authorized!!"
    })
}


export default userAuth