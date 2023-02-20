import {VendorRepository} from '../databased'
import { IUser } from './vendor-service.dto';
import { FormatData, GeneratePassword,GenerateSalt,GenerateSignature, } from '../utils';
import { GenerateOTP, sendmail } from '../utils/notification';
import { userSubject,FromAdminMail} from '../config';
import {emailHtml} from '../utils/notification'



class VendorService{
repository
constructor(){
    this.repository = new VendorRepository()
}
    async registerVendor(userInput:IUser){
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
  
              const vendor = await this.repository.CreateCustomer({email,name:"",
                password:userPassword,
                phone,
                salt,
                restaurantName: "",
                pincode:"",
                address: "",
                role:"vendor",
                serviceAvailable:false,
                rating:0,
                coverImage:""
      
            })
  
              const token = await GenerateSignature({email})
  
              return FormatData({vendor,token})
        }catch(err){
            throw new Error(`${err}`)
        }
    }
}

export default VendorService