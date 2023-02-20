import { IVendor,VendorModel } from "../model";



export class VendorRepository{
    async CreateCustomer({email,password,salt,phone}:IVendor){
        try{
            const customer = new VendorModel({email,password,salt,phone})
            const customerOutput = customer.save()
            return customerOutput
        }catch(err){
            console.log(err)
        }
    }
    async FindCustomer({email}:{email:string}){
        try{
            const existCustomer = await VendorModel.findOne({email})
            return existCustomer
        }catch(err){
            console.log(err)
        }
    }
}