import { ICustomers,CustomerModel } from "../model";
import { Iproduct } from "./customer-repository.dto";



export class CustomerRepository{
    async CreateCustomer({email,password,salt,phone}:ICustomers){
        try{
            const customer = new CustomerModel({email,password,salt,phone})
            const customerOutput = customer.save()
            return customerOutput
        }catch(err){
            console.log(err)
        }
    }
    async FindCustomer({email}:{email:string}){
        try{
            const existCustomer = await CustomerModel.findOne({email})
            return existCustomer
        }catch(err){
            console.log(err)
        }
    }
    async AddToCart(customerId:string,{_id,name,price,banner}:Iproduct,qty:number,isRemove:boolean){

        const profile = await CustomerModel.findById(customerId).populate('cart')

        if(profile){
            const cartItem ={
                product:{_id,name,price,banner},
                unit:qty
            }
            let cartItems = profile.cart

            if(cartItems.length > 0){
                let isExist = false;
                cartItems.map((item:any)=>{
                    if(item.product._id.toString() === _id.toString()){
                        if(isRemove){
                            cartItems.splice(cartItems.indexOf(item), 1)
                        }else{
                            item.unit = qty
                        }
                        isExist = true
                    }
                })
                if(!isExist){
                    cartItems.push(cartItem)
                }else{
                    cartItems.push(cartItem)    
                }
            }
                profile.cart = cartItems

                const cartSaveResult = await profile.save()

                return cartSaveResult

        }

        throw new Error("Unable to add to cart!")
    }

}