import {CustomerRepository} from '../databased'
import { IUser ,IUserLogin} from './customer-service.dto';
import { FormatData, GeneratePassword,GenerateSalt,GenerateSignature,validatePassword } from '../utils';
import { GenerateOTP, sendmail } from '../utils/notification';
import { userSubject,FromAdminMail} from '../config';
import {emailHtml} from '../utils/notification'



class CustomerService{
repository
constructor(){
    this.repository = new CustomerRepository()
}
    async registerCustomer(userInput:IUser){
        try{
            const {email,password,phone} = userInput
            const existingCustomer = await this.repository.FindCustomer({email})
            if(existingCustomer){
                throw new Error("Customer already exist")
            }

              // Generate salt
              let salt = await GenerateSalt()

              let userPassword = await GeneratePassword(password,salt)
               const {otp, otp_expiry} = GenerateOTP()

               const html = emailHtml(otp);
                await sendmail(FromAdminMail, email, userSubject, html);
  
              const customer = await this.repository.CreateCustomer({email,
                password:userPassword,
                phone,
                salt,
                lng:0,
                firstName:"",
                lastName:"",
                otp,
                otp_expiry,
                lat:0,
                verified:false,
                role:"user",
                address:"",
                cart:[]
            })
  
              const token = await GenerateSignature({email})
  
              return FormatData({customer,token})
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async Login(userInput:IUserLogin){
        try{
        const {email, password} = userInput
    
        const existingCustomer = await this.repository.FindCustomer({email})
    
        if(existingCustomer){
           const validPassword = await validatePassword(password,existingCustomer.password,existingCustomer.salt)
           if(validPassword){
            const token = await  GenerateSignature({email:existingCustomer.email})
            
            return FormatData({_id:existingCustomer._id,token})
           }
           
        }
    
        }catch(err){
            throw new Error(`${err}`)
        }
        }

        async ManageCart(customerId:string,product:any,qty:number,isRemove:boolean){
            const cartResult = await  this.repository.AddToCart(customerId,product,qty,isRemove)
        return cartResult
    }
    async SubscribeEvents(payload:any){
        payload = JSON.parse(payload)

        const {event, data} = payload
        const {userId,product,qty} = data
        switch(event){
            case 'ADD_TO_CART':
              this.ManageCart(userId, product, qty,false)
              break;
            default:
              break;

        }
    }
}

export default CustomerService