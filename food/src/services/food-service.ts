import {FoodRepository} from '../databased'
import { FoodPayload, IFood } from './food-service.dto';
import { FormatData, GeneratePassword,GenerateSalt,GenerateSignature, } from '../utils';




class FoodService{
repository
constructor(){
    this.repository = new FoodRepository()
}
    async addFood(foodInput:IFood){
        try{
            const {
                id,
                name,
                description,
                category,
                foodType,
                readyTime,
                price,
                rating,
                image,vendorId} = foodInput
           const food = await this.repository.CreateFood({
                id,
                name,
                description,
                category,
                foodType,
                readyTime,
                price,
                rating,
                image,
                vendorId
           })
           return FormatData({food})
        }catch(err){
            throw new Error(`${err}`)
        }
    }
    async GetFoodPayload(
        userId: string,
        { productId, qty }: FoodPayload,
        event: string  ) {
        const product = await this.repository.FindById(productId);
        if (product) {
          const payload = {
            event,
            data: { userId, product, qty },
          };
          return FormatData(payload);
        }else{
          throw new Error("Product is not available")
        }
      }
}

export default FoodService